export const calculateVerticalHints = (size, correctTiles) => {
    const { rowNumber, colNumber } = size;
    let correctTilesInEachColumn = [];
    for (let currColumn = 0; currColumn < colNumber; currColumn++) {
        correctTilesInEachColumn.push(correctTiles.filter(tile => Math.floor(tile / rowNumber) === currColumn).length);
    }
    return correctTilesInEachColumn;
};
export const calculateHorizontalHints = (size, correctTiles) => {
    const { rowNumber } = size;
    let correctTilesInEachRow = [];
    for (let currRow = 0; currRow < rowNumber; currRow++) {
        correctTilesInEachRow.push(correctTiles.filter(tile => tile % rowNumber === currRow).length);
    }
    return correctTilesInEachRow;
};

export const getHintText = (applicableCorrectTiles, difference) => {
    let count = 0;
    let previous;
    let hintText = [];
    for (const currTile of applicableCorrectTiles) {
        if (currTile === previous + difference) {
            count++;
        } else {
            if (count) hintText.push(count.toString());
            count = 1;
        }
        previous = currTile;
    }
    if ((hintText && count) || hintText.length === 0) hintText.push(count.toString());
    return hintText;
};

export const updateHints = (size, markedTiles, correctInfo) => {
    let { rowNumber } = size;
    let { correctTilesInEachColumn, correctTilesInEachRow } = correctInfo;
    return function (id) {
        const updateVertical = () => {
            const currColNumber = Math.floor(id / rowNumber);
            if (markedTiles.filter(tile => Math.floor(tile / rowNumber) === currColNumber).length === correctTilesInEachColumn[currColNumber]) {
                const verticalHint = document.body.querySelector(`#vertical-hint-${currColNumber}`);
                markAsFinished(verticalHint);
            }
        };
        const updateHorizontal = () => {
            const currRowNumber = id % rowNumber;
            if (markedTiles.filter(tile => tile % rowNumber === currRowNumber).length === correctTilesInEachRow[currRowNumber]) {
                const horizontalHint = document.body.querySelector(`#horizontal-hint-${currRowNumber}`);
                markAsFinished(horizontalHint);
            }
        };
        const markAsFinished = tile => {
            tile.style.color = 'white';
        };

        updateVertical();
        updateHorizontal();
    };

};