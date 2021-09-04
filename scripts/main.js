/* Etch-a-sketch project, under the context of The Odin Project curriculum.
   Started: August, 30, 2021.

   Specification:
   - Enables the user to make a pixelated-like trail with the mouse over a virtual pad.
   - The pad MUST be a square and has fixed dimensions, but the "dots" size can be customized by the user, 
   passing the wanted size.
   - "Size" is the number for the square side. Default size is 16.
*/

const pad = document.querySelector('div.pad'); //Global reference for the drawing pad
let newCells = []; //Array of the cells created inside the pad.

const clearButton = document.getElementById('clear');
const newButton = document.getElementById('newSize');
const randomButton = document.getElementById('r-colors');


/* Retrives the pad-div side. Since it should always be a square, the function returns
only one side.
   The function enables to change the pad size inside CSS rules. */

function getPadSide () {  
    const padStyles = window.getComputedStyle(pad);  
    let padSide = padStyles.getPropertyValue('width');    
    padSide = padSide.substring(0, padSide.length - 2);  //Get the property excluding the unit measurement
    return +padSide; //Return the property converted to number type
}

/* Edit CSS properties of the pad-div (the grid), by:
   1) Removing the actual cells (inner divs)
   2) Erasing former rows and columns
   3) Recreating rows and columns according to the new side
   4) Recreating the cells*/

function createGrid(side) {
    removeCells();
    pad.style.gridTemplateRows = '';
    pad.style.gridTemplateColumns = '';    
    pad.style.gridTemplateRows = `repeat(${side}, 1fr)`;
    pad.style.gridTemplateColumns = `repeat(${side}, 1fr)`;
    pad.style.backgroundColor = 'transparent';
    createCells(side);
}

/* Creates size * size divs (the cells), styles and resize each one, and
   populate the pad grid with them.   
*/

function createCells (size) {
    newCells = []; //Resetting  
    for (let i = 1; i <= (size * size); i++) {
        newCells.push(document.createElement("div"));
    }
    newCells.forEach(function (cell) {
        cell.classList.add('cell');
        resizeCell(size);
        pad.appendChild(cell);      
    })    
}

/* Resizes each cell according to pad size
   Takes one parameter, which indicates the new side of the square */

function resizeCell (size) {
    let cellSize = getPadSide() / size;
    cellSize = String(cellSize) + 'px'; //One must set CSS properties with strings
    newCells.forEach(function (cell) {
        cell.style.width = cellSize;        
        cell.style.height = cellSize;
    })
}

//Remove inner divs from the pad

function removeCells () {
    while (pad.firstChild) {
        pad.removeChild(pad.firstChild);
    }
}

function changeCell (e) {
    e.target.style.opacity = '1';
    e.target.style.backgroundColor = 'white';
}

function clearPad () {
    newCells.forEach( (cell) => cell.style.opacity = '0');
}

function evalNewSide () {
    let side = prompt('Put a number from 1 to 64 to resize the pad \nThe pad\'s size will be a square of this size');
    if (side === null) {
        return;
    } else if (isNaN(+side) || side < 1 || side > 64) {
        alert('Please, insert only a number, from 1 to 64!');
        evalNewSide();    
    }
    createGrid(side);
}

function rngColors () {
    clearPad();
    let randomColor = function (e) {
        let color = `rgb(${String(Math.floor(Math.random() * 256))},
                         ${String(Math.floor(Math.random() * 256))},
                         ${String(Math.floor(Math.random() * 256))})`;
        e.target.style.opacity = '1';
        e.target.style.backgroundColor = color;
    }
    randomButton.classList.toggle('rng-colors');
    console.log(this);
    if (randomButton.textContent === 'RANDOM COLORS'){
        pad.removeEventListener('mouseover', changeCell);
        pad.addEventListener('mouseover', randomColor);        
        randomButton.textContent = 'WHITE DOTS';
    } else {
        pad.removeEventListener('mouseover', randomColor);
        pad.addEventListener('mouseover', changeCell);
        randomButton.textContent = 'RANDOM COLORS';
    }
}

window.addEventListener('load', createGrid(16));
pad.addEventListener('mouseover', changeCell);
clearButton.addEventListener('click', clearPad);
newButton.addEventListener('click', evalNewSide);
randomButton.addEventListener('click', rngColors);