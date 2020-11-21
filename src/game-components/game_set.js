export const createGameSet = (lifeBar, board) => {
    let gameSet = document.createElement("div");
    gameSet.id = "game-set";
    gameSet.appendChild(lifeBar);
    gameSet.appendChild(board);
    return gameSet;
}