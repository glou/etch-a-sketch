//

const pad = document.querySelector('div.pad');
const newCells = [];

function getPadSize () {
    let padSize = [];
    let padStyles = window.getComputedStyle(pad);
    let padWidth = padStyles.getPropertyValue('width');    
    let padHeight = padStyles.getPropertyValue('height');
    padWidth = padWidth.substring(0, padWidth.length - 2);
    padHeight = padHeight.substring(0, padHeight.length - 2);
    padSize.push(+padWidth);
    padSize.push(+padHeight);
    return padSize;
}

function resizeCell (size) {
    let cellSize = getPadSize();
    cellSize[0] /= size;
    cellSize[1] /= size;

    cellSize = String(cellSize) +
    newCells.forEach(function (cell) {
        cell.style.width = String(cellSize[0]) + 'px';        
        cell.style.height = String(cellSize[1]) + 'px';
    })

}

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