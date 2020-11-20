import { createBoard } from './game.js';

const correctTiles = [0, 2, 5, 6, 10, 12, 14, 21, 22, 23, 24, 25, 26, 27, 28, 29, 32, 34, 45, 50, 55, 56, 57, 58, 59, 60, 62, 63, 64, 65, 67, 69, 70, 72, 75, 76, 77, 78, 79, 80, 82, 85, 87, 89, 90, 92, 95, 96, 97, 98, 99];
const numberOfCorrectTiles = correctTiles.length;
let numberOfCorrectlyMarked = 0;

const createMainContent = () => {
    const mainContent = document.createElement("div");
    mainContent.id = "main-content";
    return mainContent;
}

const tileCallback = (tile, id) => {
    const isVictorious = () => numberOfCorrectTiles === numberOfCorrectlyMarked;

    if (correctTiles.indexOf(id) !== -1) {
        tile.style.backgroundColor = "black";
        numberOfCorrectlyMarked++;
        if (isVictorious()) {
            body.style.backgroundColor = "green";
        } 
    }
}


const body = document.body;
const mainContent = createMainContent();
const board = createBoard(10, 10, tileCallback);
mainContent.appendChild(board);
body.appendChild(mainContent);