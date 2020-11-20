export const createBoard = (rowNumber, colNumber, callback) => {

    const createUpperHintRow = (colNumber) => {
        const createCornerBox = () => {
            const box = document.createElement("td");
            box.className = "corner-box";
            return box;
        }
        const createVerticalHintTile = () => {
            const hintTile = document.createElement("td");
            hintTile.className = "vertical-hint";
            return hintTile;
        }
    
        let row = document.createElement("tr");
        row.appendChild(createCornerBox());
        for (let currCol = 0; currCol < colNumber; currCol++) {
            row.appendChild(createVerticalHintTile());
        }
        return row;
    }

    const createSideHintTile = () => {
        let hintTile = document.createElement("td");
        hintTile.className = "horizontal-hint";
        return hintTile;
    }

    const createTile = (id) => {
        const tile = document.createElement("td");
        tile.className = "tile";
        tile.addEventListener('click', () => callback(tile, id));
        return tile;
    }
    const board = document.createElement("table");
    board.className = "board";
    board.appendChild(createUpperHintRow(colNumber));
    for (let currRow = 0; currRow < rowNumber; currRow++) {
        let row = document.createElement("tr");
        row.appendChild(createSideHintTile())
        for (let currCol = 0; currCol < colNumber; currCol++) {
            row.appendChild(createTile(currCol * rowNumber + currRow));
        }
        board.appendChild(row);
    }
    return board;
}

