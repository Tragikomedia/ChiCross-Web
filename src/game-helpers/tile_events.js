let timer;
let prevent = false;
const delay = 200;

export const markCallback = game => {
    let {board, rowNumber, correctTiles, markedTiles, crossedOutTiles, correctTilesInEachRow, correctTilesInEachColumn} = game;
    return function(tileInfo) {
        let {tile, id} = tileInfo;

        const updateHintTiles = () => {
            const currColNumber = Math.floor(id / rowNumber);
            if (markedTiles.filter(tile => Math.floor(tile / rowNumber) === currColNumber).length === correctTilesInEachColumn[currColNumber]) {
                const verticalHint = board.querySelector(`#vertical-hint-${currColNumber}`);
                verticalHint.style.backgroundColor = "black";
            }
    
            const currRowNumber = id % rowNumber;
            if (markedTiles.filter(tile => tile % rowNumber === currRowNumber).length === correctTilesInEachRow[currRowNumber]) {
                const horizontalHint = board.querySelector(`#horizontal-hint-${currRowNumber}`);
                horizontalHint.style.backgroundColor = "black"
            }
        }
    
        const handleTileMarking = () => {
            const handleCorrectTile = () => {
                tile.style.backgroundColor = "black";
                markedTiles.push(id);
                updateHintTiles();
                game.checkVictoryCondition();
            }
    
            const handleIncorrectTile = (tile, id) => {
                handleCrossingOut(tile, id, crossedOutTiles);
                game.deductLife();
                game.checkDefeatCondition();
            }
    
            if (crossedOutTiles.indexOf(id) === -1) {
                const isUnmarked = markedTiles.indexOf(id) === -1;
                if (correctTiles.indexOf(id) !== -1 && isUnmarked) {
                    handleCorrectTile();
                } else if (isUnmarked) {
                    handleIncorrectTile(tile, id);
                }
            }
    
        }

        // This prevents 'dblclick' and 'click' from happening simultaneously
        timer = setTimeout(() => {
            if (!prevent) {
                handleTileMarking();
            }
            prevent = false;
        }, delay);
    }
}

export const crossCallback = game => {
    let {markedTiles, crossedOutTiles} = game;
    return function(tileInfo) {
        let {tile, id} = tileInfo;
        clearTimeout(timer);
        prevent = true;
        if (markedTiles.indexOf(id) === -1) {
            handleCrossingOut(tile, id, crossedOutTiles);
        }
    }
}

export const handleCrossingOut = (tile, id, crossedOutTiles) => {
    const index = crossedOutTiles.indexOf(id);
    if (index === -1) {
        crossedOutTiles.push(id);
        tile.appendChild(document.createTextNode('X'));
    } else {
        crossedOutTiles.splice(index, 1);
        tile.removeChild(tile.childNodes[0]);
    }
}