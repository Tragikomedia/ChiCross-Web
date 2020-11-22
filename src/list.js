import { Game } from './game.js';
import { State } from './state/state.js';

export const createList = levels => {
    const list = document.createElement("ol");
    const listTiles = levels.map(level => createListTile(level));
    listTiles.forEach(listTile => {
        list.appendChild(listTile);
    });
    return list;
}

const createListTile = level => {
    const tile = document.createElement("li");
    tile.addEventListener('click', () => {
        let game = new Game(level, 5);
        let state = State.change('playing', game.gameSet);
        state.refresh();
    })
    tile.appendChild(document.createTextNode('Hello there'));
    return tile;
}