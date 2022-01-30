import saveModel from '../../src/save/saveModel';

describe('Save Model', () => {
    test('Get save from storage', () => {
        const saveFile = '1 5 6 12 65';
        const storage = {getItem: () => saveFile};
        const save = saveModel.fromStorage(storage);
        const properIds = [1, 5, 6, 12, 65];
        expect(save.length).toBe(properIds.length);
        save.forEach(id => {
            expect(properIds).toContain(id);
        });
    });
    test('Get save from empty storage', () => {
        const storage = {getItem: () => null};
        const save = saveModel.fromStorage(storage);
        expect(save.length).toBe(0);
    });
    test('Save from empty memory', () => {
        const memory = [];
        const save = saveModel.fromMemory(memory);
        expect(save.length).toBe(0);
    });
    test('Save from existing memory', () => {
        const memory = [1, 6, 12, 43];
        const save = saveModel.fromMemory(memory);
        expect(save).toBe('1 6 12 43');
    });
});