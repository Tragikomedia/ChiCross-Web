export const createLifeBar = (lives) => {
    let lifeBar = document.createElement("h2");
    lifeBar.id = 'life-bar';
    lifeBar.appendChild(document.createTextNode(`Lives: ${lives}`));
    return lifeBar;
}