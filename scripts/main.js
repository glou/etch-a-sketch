/* Etch-a-sketch project, under the context of The Odin Project curriculum.
   Started: August, 30, 2021.

   Specification:
   - Enables the user to make a pixelated-like trail with the mouse over a virtual squared pad.
   - The pad has fixed dimensions, but the "dots" size can be customized by the user, 
   passing the wanted size.
   - "Size" is the number for the square side. Default size is 16.
*/


const pad = document.querySelector('div.pad'); //Global reference for the drawing pad
const newCells = []; //Array of the cells created inside the pad.


/* Retrives the pad-div side. Since it should always be a square, the function returns
only one side.
   The function enables to change the pad size inside CSS rules. */

function getPadSide () {    
    let padStyles = window.getComputedStyle(pad);
    let padSide = padStyles.getPropertyValue('width');    
    padSide = padSide.substring(0, padSide.length - 2);  //Get the property excluding the unit measurement
    return +padSide; //Return the property converted to number type
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

/* Create a size * size grid inside the pad, and populates each cell with a div.
   The cells are dimensioned through our resizeCell function.
*/

function createCells (size) {    
    for (let i = 1; i <= (size * size); i++) {
        newCells.push(document.createElement("div"));
    }
    newCells.forEach(function (cell) {
        cell.classList.add('cell');                
        resizeCell(size);        
        pad.appendChild(cell);
    })    
}