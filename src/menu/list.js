import { Game } from '../game/game.js';
import { runAnimatedTransition } from '../state/helpers.js';
import { levels } from '../levels/levels.js';
import saveSystem from '../save/saveSystem.js';

export const getList = () => {
    const levelList = levels;
    const memory = saveSystem.load(saveSystem.accessStorage());
    return createList(levelList, memory);
}

const createList = (levels, memory = []) => {
    const listContainer = document.createElement("div");
    listContainer.id = "list-container";
    const title = document.createElement('h2');
    title.appendChild(document.createTextNode('Choose level'));
    const list = document.createElement("div");
    list.id = "level-list";
    const listTiles = levels.map(level => createListTile(level, memory.includes(level.id)));
    listTiles.forEach(listTile => {
        list.appendChild(listTile);
    });
    listContainer.appendChild(list);
    listContainer.appendChild(title);
    return listContainer;
}

const createListTile = (level, isCompleted) => {
    const tile = document.createElement("div");
    tile.className = "list-tile non-selectable";
    tile.addEventListener('click', () => {
        let game = new Game(level, 5);
        runAnimatedTransition(game.gameSet, 'fading-animation');
    })
    const description = isCompleted ? level['character'] : level['meaning']
    tile.appendChild(document.createTextNode(description));
    return tile;
}