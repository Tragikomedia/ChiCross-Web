import { createBoard } from './game-components/board.js';
import { createLifeBar } from './game-components/life_bar.js';
import { createGameSet } from './game-components/game_set.js';
import { calculateVerticalHints, calculateHorizontalHints } from './game-helpers/hint_helpers.js';
import { markCallback, crossCallback} from './game-helpers/tile_events.js';

export class Game {
    constructor(rowNumber, colNumber, correctTiles, lives) {
        this.lives = lives;

        this.rowNumber = rowNumber;
        this.colNumber = colNumber;

        this.correctTiles = correctTiles;
        this.numberOfCorrectTiles = correctTiles.length;

        this.markedTiles = [];
        this.crossedOutTiles = [];

        this.correctTilesInEachColumn = calculateVerticalHints(colNumber, rowNumber, correctTiles);
        this.correctTilesInEachRow = calculateHorizontalHints(rowNumber, correctTiles);

        this.callbacks = {
            markCallback : markCallback(this),
            crossCallback : crossCallback(this)
        };
        
        this.lifeBar = createLifeBar(this.lives);
        this.board = createBoard(this);
        this.gameSet = createGameSet(this.lifeBar, this.board);
    }

    deductLife = () => {
        this.lives--;
        this.lifeBar.innerHTML = `Lives: ${this.lives}`;
    }

    checkDefeatCondition = () => {
        if (!this.lives) this.gameSet.removeChild(this.board);
    }

    checkVictoryCondtition = () => {
        if (this.numberOfCorrectTiles === this.markedTiles.length) {
            this.gameSet.removeChild(this.board);
            this.lifeBar.innerHTML = 'CONGRATULATIONS';
        }
    }
}