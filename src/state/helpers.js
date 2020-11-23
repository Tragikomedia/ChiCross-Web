import { State } from './state.js';

export const runAnimatedTransition = (toShow, toRemove, animation) => {
    toRemove.style.animationName = animation;
    toRemove.style.animationDirection = 'reverse';
    toRemove.style.animationFillMode = 'forwards';
    toRemove.style.animationDuration = '1s';

    toShow.style.animationName = animation;
    toShow.style.animationDuration = '1s';
    setTimeout(() => {
        let state = State.change(toShow);
        state.refresh();
    },
    1500);
}