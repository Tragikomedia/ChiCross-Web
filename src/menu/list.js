import { Game } from '../game/game.js';
import { State } from '../state/state.js';
import { runAnimatedTransition } from '../state/helpers.js';

export const createList = levels => {
    const listContainer = document.createElement("div");
    listContainer.id = "list-container";
    const title = document.createElement('h2');
    title.appendChild(document.createTextNode('Prithee chooseth a leveleth'));
    const list = document.createElement("div");
    list.id = "level-list";
    const listTiles = levels.map(level => createListTile(level));
    listTiles.forEach(listTile => {
        list.appendChild(listTile);
    });
    listContainer.appendChild(list);
    listContainer.appendChild(title);
    return listContainer;
}

const createListTile = level => {
    const tile = document.createElement("div");
    tile.className = "list-tile non-selectable";
    tile.addEventListener('click', () => {
        let game = new Game(level, 5);
        runAnimatedTransition(game.gameSet, document.querySelector('#list-container'), 'fading-animation');
    })
    tile.appendChild(document.createTextNode(level['meaning']));
    return tile;
}