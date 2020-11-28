import { calculateVerticalHints, calculateHorizontalHints, getHintText } from "../../../src/game/game-helpers/hint_helpers";

describe('Vertical Tiles', () => {
    let size = {rowNumber: 10, colNumber: 10};
    test('Testing calculations with actual tiles', () => {
        const correctTiles = [0, 2, 5, 6, 10, 12, 14, 21, 22, 23, 24, 25, 26, 27, 28, 29, 32, 34, 45, 50, 55, 56, 57, 58, 59, 60, 62, 63, 64, 65, 67, 69, 70, 72, 75, 76, 77, 78, 79, 80, 82, 85, 87, 89, 90, 92, 95, 96, 97, 98, 99];
        const results = calculateVerticalHints(size, correctTiles);
        expect(results.length).toBe(10);
        expect(results[0]).toBe(4);
        expect(results[4]).toBe(1);
        expect(results[9]).toBe(7);
    });
    test('Test calculations with empty list', () => {
        const correctTiles = [];
        const results = calculateVerticalHints(size, correctTiles);
        results.forEach(column => expect(column).toBe(0));
    });
    test('Test calculations with non-standard size', () => {
        const strangeSize = {rowNumber: 5, colNumber: 7};
        const correctTiles = [0, 4, 5, 7, 12, 13, 14, 15, 19, 20, 26, 28, 29, 31, 32, 33, 34];
        const results = calculateVerticalHints(strangeSize, correctTiles);
        expect(results.length).toBe(7);
        expect(results[0]).toBe(2);
        expect(results[4]).toBe(1);
        expect(results[6]).toBe(4);
    });
});

describe('Horizontal Tiles', () => {
    let size = {rowNumber: 10, colNumber: 10};
    test('Testing calculations with actual tiles', () => {
        const correctTiles = [0, 2, 5, 6, 10, 12, 14, 21, 22, 23, 24, 25, 26, 27, 28, 29, 32, 34, 45, 50, 55, 56, 57, 58, 59, 60, 62, 63, 64, 65, 67, 69, 70, 72, 75, 76, 77, 78, 79, 80, 82, 85, 87, 89, 90, 92, 95, 96, 97, 98, 99];
        const results = calculateHorizontalHints(size, correctTiles);
        expect(results.length).toBe(10);
        expect(results[0]).toBe(7);
        expect(results[4]).toBe(4)
        expect(results[9]).toBe(6);
    });
    test('Test calculations with empty list', () => {
        const correctTiles = [];
        const results = calculateHorizontalHints(size, correctTiles);
        results.forEach(column => expect(column).toBe(0));
    });
    test('Test calculations with non-standard size', () => {
        const strangeSize = {rowNumber: 5, colNumber: 7};
        const correctTiles = [0, 4, 5, 7, 12, 13, 14, 15, 19, 20, 26, 28, 29, 31, 32, 33, 34];
        const results = calculateHorizontalHints(strangeSize, correctTiles);
        expect(results.length).toBe(5);
        expect(results[0]).toBe(4);
        expect(results[3]).toBe(3);
        expect(results[4]).toBe(5);
    })
});

describe('Hint Text', () => {
    test('Prepare text using actual data for vertical hint', () => {
        const standardDifference = 1;
        const results = getHintText([0, 2, 5, 6,], standardDifference);
        expect(results.length).toBe(3);
        expect(results[0]).toBe('1');
        expect(results[1]).toBe('1');
        expect(results[2]).toBe('2');
    });
    test('Prepare text using actual data for horizontal hint', () => {
        const standardDifference = 10;
        const results = getHintText([0, 10, 50, 60, 70, 80, 90], standardDifference);
        expect(results.length).toBe(2);
        expect(results[0]).toBe('2');
        expect(results[1]).toBe('5');
    });
    test('Prepare text if no tiles are applicable', () => {
        const results = getHintText([], 1);
        expect(results.length).toBe(1);
        expect(results[0]).toBe('0');
    });
})