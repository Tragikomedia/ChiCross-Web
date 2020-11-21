import { createBoard } from './game-components/board.js';
import { createLifeBar } from './game-components/life_bar.js';
import { createGameSet } from './game-components/game_set.js';
import { calculateVerticalHints, calculateHorizontalHints } from './hint_helpers.js';

export class Game {
    constructor(rowNumber, colNumber, correctTiles, lives) {
        this.lives = lives;

        this.numberOfCorrectTiles = correctTiles.length;

        this.markedTiles = [];
        this.crossedOutTiles = [];

        this.correctTilesInEachColumn = calculateVerticalHints(colNumber, rowNumber, correctTiles);
        this.correctTilesInEachRow = calculateHorizontalHints(rowNumber, correctTiles);

        this.timer;
        this.prevent = false;
        this.delay = 200;

        this.markCallback = (tile, id) => {
            const isVictorious = () => this.numberOfCorrectTiles === this.markedTiles.length;
        
            const updateHintTiles = () => {
                const currColNumber = Math.floor(id / rowNumber);
                if (this.markedTiles.filter(tile => Math.floor(tile / rowNumber) === currColNumber).length === this.correctTilesInEachColumn[currColNumber]) {
                    const verticalHint = this.board.querySelector(`#vertical-hint-${currColNumber}`);
                    verticalHint.style.backgroundColor = "black";
                }
        
                const currRowNumber = id % rowNumber;
                if (this.markedTiles.filter(tile => tile % rowNumber === currRowNumber).length === this.correctTilesInEachRow[currRowNumber]) {
                    const horizontalHint = this.board.querySelector(`#horizontal-hint-${currRowNumber}`);
                    horizontalHint.style.backgroundColor = "black"
                }
            }
        
            const handleTileMarking = () => {
                const handleCorrectTile = () => {
                    tile.style.backgroundColor = "black";
                    this.markedTiles.push(id);
                    updateHintTiles();
                    if (isVictorious()) {
                        this.body.style.backgroundColor = "green";
                    }
                }
        
                const handleIncorrectTile = (tile, id) => {
                    const handleDefeat = () => {
                        this.gameSet.removeChild(this.board);
                    }
                    this.handleCrossingOut(tile, id);
                    lives--;
                    this.lifeBar.innerHTML = `Lives: ${lives}`;
                    if (!lives) {
                        handleDefeat();
                    }
                }
        
                if (this.crossedOutTiles.indexOf(id) === -1) {
                    const isUnmarked = this.markedTiles.indexOf(id) === -1;
                    if (correctTiles.indexOf(id) !== -1 && isUnmarked) {
                        handleCorrectTile();
                    } else if (isUnmarked) {
                        handleIncorrectTile(tile, id);
                    }
                }
        
            }
            this.timer = setTimeout(() => {
                if (!this.prevent) {
                    handleTileMarking();
                }
                this.prevent = false;
            }, this.delay);
        }

        this.crossCallback = (tile, id) => {
            clearTimeout(this.timer);
            this.prevent = true;
            if (this.markedTiles.indexOf(id) === -1) {
                this.handleCrossingOut(tile, id);
            }
        }

        this.handleCrossingOut = (tile, id) => {
            const index = this.crossedOutTiles.indexOf(id);
            if (index === -1) {
                this.crossedOutTiles.push(id);
                tile.appendChild(document.createTextNode('X'));
            } else {
                this.crossedOutTiles.splice(index, 1);
                tile.removeChild(tile.childNodes[0]);
            }
        }

        this.lifeBar = createLifeBar(this.lives);
        this.board = createBoard(rowNumber, colNumber, correctTiles, this.markCallback, this.crossCallback);
        this.gameSet = createGameSet(this.lifeBar, this.board);
    }
}