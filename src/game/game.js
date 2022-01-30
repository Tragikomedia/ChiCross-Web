import { createBoard } from './game-components/board.js';
import { createLifeBar } from './game-components/life_bar.js';
import { createGameSet } from './game-components/game_set.js';
import { calculateVerticalHints, calculateHorizontalHints, updateHints } from './game-helpers/hint_helpers.js';
import { markCallback, crossCallback } from './game-helpers/tile_events.js';
import { runAnimatedTransition } from '../state/helpers.js';
import { createEndScreen } from './end-screen/end_screen.js';
import { createButtonRow, createBackToListButton, createRestartButton, createHowToPlayButton } from '../core/buttons/buttons.js';
import saveSystem from '../save/saveSystem.js';

export class Game {
    constructor(level, lives) {
        let {rowNumber, colNumber, correctTiles} = level;
        this.level = level;
        this.lives = lives;

        this.size = {
            rowNumber: rowNumber,
            colNumber: colNumber
        }

        this.correctInfo = {
            correctTiles: correctTiles,
            numberOfCorrectTiles: correctTiles.length,
            correctTilesInEachRow: calculateHorizontalHints(this.size, correctTiles),
            correctTilesInEachColumn: calculateVerticalHints(this.size, correctTiles)
        }

        this.markedTiles = [];
        this.crossedOutTiles = [];

        this.callbacks = {
            markCallback: markCallback(this),
            crossCallback: crossCallback(this)
        };

        this.hintUpdateHandler = updateHints(this.size, this.markedTiles, this.correctInfo);

        this.components = {
            lifeBar: createLifeBar(this.lives),
            board: createBoard(this),
            buttons: createButtonRow(createBackToListButton('#game-set'), createHowToPlayButton(), createRestartButton(level))
        }

        this.gameSet = createGameSet(this.components);
    }

    deductLife = () => {
        this.lives--;
        this.components['lifeBar'].innerHTML = `Lives: ${this.lives}`;
    }

    checkDefeatCondition = () => {
        if (!this.lives) {
            let defeatScreen = createEndScreen({level: this.level, result: 'defeat'});
            runAnimatedTransition(defeatScreen, 'fading-animation');
        }
    }

    checkVictoryCondtition = () => {
        if (this.correctInfo['numberOfCorrectTiles'] === this.markedTiles.length) {
            saveSystem.saveVictory(this.level.id);
            let victoryScreen = createEndScreen({level: this.level, result: 'victorious'});
            runAnimatedTransition(victoryScreen, 'fading-animation');    
        }
    }
}