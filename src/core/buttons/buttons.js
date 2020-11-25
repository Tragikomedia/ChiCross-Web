import { runAnimatedTransition } from '../../state/helpers.js';
import { createList } from '../../menu/list.js';
import { levels } from '../../levels/levels.js';
import { Game } from '../../game/game.js';

export const createButtonRow = (...buttons) => {
    const buttonRow = document.createElement('div');
    buttonRow.id = 'button-row';
    buttons.forEach(button => buttonRow.appendChild(button));
    return buttonRow;
}

export const createBackToListButton = () => createButton('Back to list', () => {
    const list = createList(levels);
    runAnimatedTransition(list, 'fading-animation');
});

export const createRestartButton = level => createButton('Try again', () => {
    const game = new Game(level, 5);
    runAnimatedTransition(game.gameSet, 'fading-animation');
});

const createButton = (text, eventHandler) => {
    const button = document.createElement('button');
    button.appendChild(document.createTextNode(text));
    button.addEventListener('click', eventHandler);
    return button;
}