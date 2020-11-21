export const calculateVerticalHints = (colNumber, rowNumber, correctTiles) => {
    let correctTilesInEachColumn = [];
    for (let currColumn = 0; currColumn < colNumber; currColumn++) {
        correctTilesInEachColumn.push(correctTiles.filter(tile => Math.floor(tile / rowNumber) === currColumn).length);
    }
    return correctTilesInEachColumn;
}
export const calculateHorizontalHints = (rowNumber, correctTiles) => {
    let correctTilesInEachRow = [];
    for (let currRow = 0; currRow < rowNumber; currRow++) {
        correctTilesInEachRow.push(correctTiles.filter(tile => tile % rowNumber === currRow).length);
    }
    return correctTilesInEachRow;
}