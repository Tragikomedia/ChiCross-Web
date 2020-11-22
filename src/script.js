import { State } from './state/state.js';
import { createList } from './list.js'; 
import { levels } from './levels/levels.js';

const createMainContentPositioning = () => {
    const mainContent = document.createElement("div");
    mainContent.id = "main-content";
    return mainContent;
}

const body = document.body;
const mainContentPositioning = createMainContentPositioning();
body.appendChild(mainContentPositioning);
let list = createList(levels);
let state = State.change('choosing', list);
state.refresh();

