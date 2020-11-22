export const calculateVerticalHints = (size, correctTiles) => {
    const { rowNumber, colNumber } = size;
    let correctTilesInEachColumn = [];
    for (let currColumn = 0; currColumn < colNumber; currColumn++) {
        correctTilesInEachColumn.push(correctTiles.filter(tile => Math.floor(tile / rowNumber) === currColumn).length);
    }
    return correctTilesInEachColumn;
}
export const calculateHorizontalHints = (size, correctTiles) => {
    const { rowNumber } = size;
    let correctTilesInEachRow = [];
    for (let currRow = 0; currRow < rowNumber; currRow++) {
        correctTilesInEachRow.push(correctTiles.filter(tile => tile % rowNumber === currRow).length);
    }
    return correctTilesInEachRow;
}

export const updateHints = (size, markedTiles, correctInfo) => {
    let { rowNumber } = size;
    let { correctTilesInEachColumn, correctTilesInEachRow } = correctInfo;
    return function (id) {

        const updateVertical = () => {
            const currColNumber = Math.floor(id / rowNumber);
            if (markedTiles.filter(tile => Math.floor(tile / rowNumber) === currColNumber).length === correctTilesInEachColumn[currColNumber]) {
                const verticalHint = document.body.querySelector(`#vertical-hint-${currColNumber}`);
                updateHintTile(verticalHint);
            }
        }
        const updateHorizontal = () => {
            const currRowNumber = id % rowNumber;
            if (markedTiles.filter(tile => tile % rowNumber === currRowNumber).length === correctTilesInEachRow[currRowNumber]) {
                const horizontalHint = document.body.querySelector(`#horizontal-hint-${currRowNumber}`);
                updateHintTile(horizontalHint);
            }
        }
        const updateHintTile = tile => {
            tile.style.backgroundColor = "black";
        }

        updateVertical();
        updateHorizontal();
    }

}