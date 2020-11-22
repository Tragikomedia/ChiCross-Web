import { createBoard } from './game-components/board.js';
import { createLifeBar } from './game-components/life_bar.js';
import { createGameSet } from './game-components/game_set.js';
import { calculateVerticalHints, calculateHorizontalHints, updateHints } from './game-helpers/hint_helpers.js';
import { markCallback, crossCallback} from './game-helpers/tile_events.js';

export class Game {
    constructor(rowNumber, colNumber, correctTiles, lives) {
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
            markCallback : markCallback(this),
            crossCallback : crossCallback(this)
        };

        this.hintUpdateHandler = updateHints(this.size, this.markedTiles, this.correctInfo);
        
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
        if (this.correctInfo['numberOfCorrectTiles'] === this.markedTiles.length) {
            this.gameSet.removeChild(this.board);
            this.lifeBar.innerHTML = 'CONGRATULATIONS';
        }
    }
}