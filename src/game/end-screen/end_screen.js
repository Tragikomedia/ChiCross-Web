import { createBackToListButton } from "../../core/buttons/buttons.js";

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
        charDiv.id = "defeat";
        charDiv.appendChild(document.createTextNode('DEFEAT'));
    }
    endScreen.appendChild(charDiv);
    endScreen.appendChild(createBackToListButton(`#${endScreen.id}`));
    return endScreen;
}