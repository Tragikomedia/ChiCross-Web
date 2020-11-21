import { createBoard } from './board.js';

const correctTiles = [0, 2, 5, 6, 10, 12, 14, 21, 22, 23, 24, 25, 26, 27, 28, 29, 32, 34, 45, 50, 55, 56, 57, 58, 59, 60, 62, 63, 64, 65, 67, 69, 70, 72, 75, 76, 77, 78, 79, 80, 82, 85, 87, 89, 90, 92, 95, 96, 97, 98, 99];
const numberOfCorrectTiles = correctTiles.length;

let markedTiles = [];
let crossedOutTiles = [];

let correctTilesInEachColumn = [];
let correctTilesInEachRow = [];

let timer;
let prevent;
const delay = 200;

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

const createMainContentPositioning = () => {
    const mainContent = document.createElement("div");
    mainContent.id = "main-content";
    return mainContent;
}

const markCallback = (tile, id) => {
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

    const handleTileMarking = () => {
        const handleCorrectTile = () => {
            tile.style.backgroundColor = "black";
            markedTiles.push(id);
            updateHintTiles();
            if (isVictorious()) {
                body.style.backgroundColor = "green";
            }
        }

        const handleIncorrectTile = (tile, id) => {
            const handleDefeat = () => {
                gameSet.removeChild(board);
            }
            handleCrossingOut(tile, id);
            lives--;
            lifeBar.innerHTML = `Lives: ${lives}`;
            if (!lives) {
                handleDefeat();
            }
        }

        if (crossedOutTiles.indexOf(id) === -1) {
            const isUnmarked = markedTiles.indexOf(id) === -1;
            if (correctTiles.indexOf(id) !== -1 && isUnmarked) {
                handleCorrectTile();
            } else if (isUnmarked) {
                handleIncorrectTile(tile, id);
            }
        }

    }
    timer = setTimeout(() => {
        if (!prevent) {
            handleTileMarking();
        }
        prevent = false;
    }, delay);
}

const handleCrossingOut = (tile, id) => {
    const index = crossedOutTiles.indexOf(id);
    if (index === -1) {
        crossedOutTiles.push(id);
        tile.appendChild(document.createTextNode('X'));
    } else {
        crossedOutTiles.splice(index, 1);
        tile.removeChild(tile.childNodes[0]);
    }
}

const crossCallback = (tile, id) => {
    clearTimeout(timer);
    prevent = true;
    if (markedTiles.indexOf(id) === -1) {
        handleCrossingOut(tile, id);
    }
}

const createLifeBar = () => {
    let lifeBar = document.createElement("p");
    lifeBar.id = 'life-bar';
    lifeBar.appendChild(document.createTextNode(`Lives: ${lives}`));
    return lifeBar;
}

const createGameSet = () => {
    let gameSet = document.createElement("div");
    gameSet.id = "game-set";
    return gameSet;
}

const rowNumber = 10;
const colNumber = 10;
let lives = 5;

const body = document.body;
const mainContentPositioning = createMainContentPositioning();
const gameSet = createGameSet();
const lifeBar = createLifeBar();
const board = createBoard(rowNumber, colNumber, correctTiles, markCallback, crossCallback);
calculateTileNumbersForHints();
gameSet.appendChild(lifeBar);
gameSet.appendChild(board);
mainContentPositioning.appendChild(gameSet);
body.appendChild(mainContentPositioning);
