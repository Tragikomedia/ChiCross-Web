import { State } from './state/state.js';
import { createList } from './list.js'; 

const correctTiles = [0, 2, 5, 6, 10, 12, 14, 21, 22, 23, 24, 25, 26, 27, 28, 29, 32, 34, 45, 50, 55, 56, 57, 58, 59, 60, 62, 63, 64, 65, 67, 69, 70, 72, 75, 76, 77, 78, 79, 80, 82, 85, 87, 89, 90, 92, 95, 96, 97, 98, 99];

const createMainContentPositioning = () => {
    const mainContent = document.createElement("div");
    mainContent.id = "main-content";
    return mainContent;
}

const level = {
    rowNumber: 10,
    colNumber: 10,
    correctTiles: correctTiles
}

const body = document.body;
const mainContentPositioning = createMainContentPositioning();
body.appendChild(mainContentPositioning);
let list = createList([level, level, level, level]);
let state = State.change('choosing', list);
state.refresh();

