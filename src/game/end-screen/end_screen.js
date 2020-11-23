export const createEndScreen = levelData => {
    const { result, level } = levelData;
    const { character } = level;

    const endScreen = document.createElement("div");
    const charDiv = document.createElement("div");
    endScreen.id = "end-screen";
    if (result === 'victorious'){ 
        charDiv.id = "character";
        charDiv.appendChild(document.createTextNode(character));
    }
    else {
        charDiv.id = "right-side";
        charDiv.appendChild(document.createTextNode('0'));
    }
    endScreen.appendChild(charDiv);
    return endScreen;
}