import { State } from '../../src/state/state';

describe('State class', () => {

    test('State should hold content when given one', () => {
        const content = document.createElement('div');
        const state = new State(content);
        expect(state.content).toEqual(content);
    });
});