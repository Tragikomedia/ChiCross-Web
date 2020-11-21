export const createLifeBar = (lives) => {
    let lifeBar = document.createElement("p");
    lifeBar.id = 'life-bar';
    lifeBar.appendChild(document.createTextNode(`Lives: ${lives}`));
    return lifeBar;
}