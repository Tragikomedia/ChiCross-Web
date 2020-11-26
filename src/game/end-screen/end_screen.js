import { createBackToListButton, createButtonRow, createRestartButton } from "../../core/buttons/buttons.js";

export const createEndScreen = levelData => {
    const createVictoryDiv = () => {
        const div = document.createElement("div");
        const meaningDiv = document.createElement("div");
        const char = document.createElement("div");
        char.id = "character";
        meaningDiv.id = "meaning";
        meaningDiv.appendChild(document.createTextNode(meaning));
        char.appendChild(document.createTextNode(character));
        div.appendChild(char);
        div.appendChild(meaningDiv);
        return div;
    }
    const createDefeatDiv = () => {
        const div = document.createElement("div");
        div.id = "defeat";
        div.appendChild(document.createTextNode('DEFEAT'));
        return div;
    }
    const { result, level } = levelData;
    const { character, meaning } = level;

    const endScreen = document.createElement("div");
    let messageDiv;
    let buttonRow;
    endScreen.id = "end-screen";
    if (result === 'victorious'){ 
        messageDiv = createVictoryDiv();
        buttonRow = createButtonRow(createBackToListButton());
    }
    else {
        messageDiv = createDefeatDiv();
        buttonRow = createButtonRow(createBackToListButton(), createRestartButton(level));
    }
    endScreen.appendChild(messageDiv);
    endScreen.appendChild(buttonRow);
    return endScreen;
}