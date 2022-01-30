export const addTutorial = () => {
    const tutorialBox = createTutorialBox();
    const board = document.querySelector('#board');
    board.insertBefore(tutorialBox, board.firstChild);
};

export const removeTutorial = () => {
    document.querySelector('#board').removeChild(document.querySelector('#tutorial'));
};

const tutorialMessages = [
    'The goal of the game is to mark all the correct tiles.',
    'Click a tile to mark it as correct.',
    'Numbers to the top and left serve as hints indicating which tiles should be marked in the given column or row respectively.',
    'A number indicates how many correct tiles there are in a sequence.',
    'E.g. \'2 3 1\' in a vertical hint means that there is 0 or more empty tiles from the top, at least 2 correct tiles in a row, minimum 1 space, 3 correct tiles, at least 1 space, 1 correct tile and then 0 or more empty tiles.',
    'You can right-click (long-press on mobile) or double-click a tile to cross it out which will prevent you from marking it accidentally.'
];

const createTutorialBox = () => {
    const tutorialDiv = document.createElement('div');
    tutorialDiv.id = 'tutorial';
    const list = document.createElement('ul');
    list.appendChild(document.createTextNode('How to play'));
    tutorialMessages.forEach(message => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(message));
        list.appendChild(li);
    });
    tutorialDiv.appendChild(list);
    return tutorialDiv;
};