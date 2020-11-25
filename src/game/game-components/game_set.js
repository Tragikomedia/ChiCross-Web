import { createBackToListButton, createRestartButton } from '../../core/buttons/buttons.js';

export const createGameSet = ({lifeBar, board, buttons}) => {
    let gameSet = document.createElement("div");
    gameSet.id = "game-set";
    gameSet.appendChild(lifeBar);
    gameSet.appendChild(board);
    gameSet.appendChild(buttons);
    return gameSet;
}