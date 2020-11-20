import { createBoard } from './board.js';

const correctTiles = [0, 2, 5, 6, 10, 12, 14, 21, 22, 23, 24, 25, 26, 27, 28, 29, 32, 34, 45, 50, 55, 56, 57, 58, 59, 60, 62, 63, 64, 65, 67, 69, 70, 72, 75, 76, 77, 78, 79, 80, 82, 85, 87, 89, 90, 92, 95, 96, 97, 98, 99];
const numberOfCorrectTiles = correctTiles.length;

let markedTiles = [];

let correctTilesInEachColumn = [];
let correctTilesInEachRow = [];

const calculateTileNumbersForHints = () => {
    const calculateVertical = () => {
        for (let currColumn = 0; currColumn < colNumber; currColumn++) {
            correctTilesInEachColumn.push(correctTiles.filter(tile => Math.floor(tile / rowNumber) === currColumn).length); 
        }
    }
    const calculateHorizontal = () => {
        for (let currRow = 0; currRow < rowNumber; currRow++) {
            correctTilesInEachRow.push(correctTiles.filter(tile => tile % rowNumber === currRow).length); 
        }
    }

    calculateVertical();
    calculateHorizontal();
}

const createMainContent = () => {
    const mainContent = document.createElement("div");
    mainContent.id = "main-content";
    return mainContent;
}

const tileCallback = (tile, id) => {
    const isVictorious = () => numberOfCorrectTiles === markedTiles.length;

    const updateHintTiles = () => {
        const currColNumber = Math.floor(id / rowNumber);
        if (markedTiles.filter(tile => Math.floor(tile / rowNumber) === currColNumber).length === correctTilesInEachColumn[currColNumber]) {
            const verticalHint = board.querySelector(`#vertical-hint-${currColNumber}`);
            verticalHint.style.backgroundColor = "black";
        }
        
        const currRowNumber = id % rowNumber;
        if (markedTiles.filter(tile => tile % rowNumber === currRowNumber).length === correctTilesInEachRow[currRowNumber]) {
            const horizontalHint = board.querySelector(`#horizontal-hint-${currRowNumber}`);
            horizontalHint.style.backgroundColor = "black"
        }
    }

    if (correctTiles.indexOf(id) !== -1) {
        tile.style.backgroundColor = "black";
        markedTiles.push(id);
        updateHintTiles();
        if (isVictorious()) {
            body.style.backgroundColor = "green";
        } 
    }
}

const rowNumber = 10;
const colNumber = 10;

const body = document.body;
const mainContent = createMainContent();
const board = createBoard(rowNumber, colNumber, tileCallback);
calculateTileNumbersForHints();
mainContent.appendChild(board);
body.appendChild(mainContent);