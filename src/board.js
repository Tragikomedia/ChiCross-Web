export const createBoard = (rowNumber, colNumber, correctTiles, markCallback, crossCallback) => {

    const createUpperHintRow = (colNumber) => {
        const createCornerBox = () => {
            const box = document.createElement("td");
            box.className = "corner-box";
            return box;
        }
        const createVerticalHintTile = (colNumber) => {
            const hintTile = document.createElement("td");
            hintTile.className = "vertical-hint";
            hintTile.id = `vertical-hint-${colNumber}`;
            createHintText('vertical', colNumber).forEach(data => {
                let p = document.createElement("p");
                p.appendChild(document.createTextNode(data));
                hintTile.appendChild(p);
            });
            return hintTile;
        }

        let row = document.createElement("tr");
        row.appendChild(createCornerBox());
        for (let currCol = 0; currCol < colNumber; currCol++) {
            row.appendChild(createVerticalHintTile(currCol));
        }
        return row;
    }

    const createSideHintTile = (rowNumber) => {
        let hintTile = document.createElement("td");
        hintTile.className = "horizontal-hint";
        hintTile.id = `horizontal-hint-${rowNumber}`;
        hintTile.appendChild(document.createTextNode(createHintText('horizontal', rowNumber).join(' ')));
        return hintTile;
    }

    const createTile = (id) => {
        const tile = document.createElement("td");
        tile.className = "tile";
        // Catching right-click by 'click' event didn't work
        tile.addEventListener('contextmenu', event => {
            event.preventDefault();
            crossCallback(tile, id);
        });
        tile.addEventListener('click', (event) => {
            if (event.button === 0) markCallback(tile, id);
        });
        tile.addEventListener('dblclick', () => crossCallback(tile, id));
        return tile;
    }

    const createHintText = (orientation, positionNumber) => {
        const getProperHints = (applicableCorrectTiles, difference) => {
            let count = 0;
            let previous;
            let hintText = [];
            for (const currTile of applicableCorrectTiles) {
                if (currTile === previous + difference) {
                    count++
                } else {
                    if (count) hintText.push(count.toString());
                    count = 1;
                }
                previous = currTile;
            }
            if ((hintText && count) || !hintText) hintText.push(count.toString());
            return hintText;
        }

        let applicableCorrectTiles, difference;
        switch (orientation) {
            case 'vertical':
                applicableCorrectTiles = correctTiles.filter(tile => Math.floor(tile / rowNumber) === positionNumber);
                difference = 1;
                break;
            case 'horizontal':
            default:
                applicableCorrectTiles = correctTiles.filter(tile => tile % rowNumber === positionNumber);
                difference = rowNumber;
                break;
        }
        return getProperHints(applicableCorrectTiles, difference);
    }

    const board = document.createElement("table");
    board.className = "board";
    board.appendChild(createUpperHintRow(colNumber));
    for (let currRow = 0; currRow < rowNumber; currRow++) {
        let row = document.createElement("tr");
        row.appendChild(createSideHintTile(currRow))
        for (let currCol = 0; currCol < colNumber; currCol++) {
            row.appendChild(createTile(currCol * rowNumber + currRow));
        }
        board.appendChild(row);
    }
    return board;
}

