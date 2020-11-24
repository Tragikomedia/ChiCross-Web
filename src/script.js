import { State } from './state/state.js';
import { createList } from './menu/list.js'; 
import { levels } from './levels/levels.js';

const createMainContentPositioning = () => {
    const mainContent = document.createElement("div");
    mainContent.id = "main-content";
    return mainContent;
}

let list = createList(levels);
let state = State.change(list);
state.refresh();

