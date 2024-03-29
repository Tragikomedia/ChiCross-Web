import { State } from './state.js';

export const runAnimatedTransition = (toShow, animation) => {
    const duration = 500;
    let toRemove = document.querySelector('#main-content').firstChild;
    toRemove.style.animationDirection = 'reverse';
    toRemove.style.animationFillMode = 'forwards';
    toRemove.style.animationDuration = `${duration}ms`;
    toRemove.style.animationName = animation;

    toShow.style.animationName = animation;
    toShow.style.animationDuration = `${duration}ms`;
    // Remove the element when it's not visible
    setTimeout(() => {
        let state = State.change(toShow);
        state.refresh();
    },
    duration);
    // Strip the remaining element from animation with offset to ensure it works
    setTimeout(() => {
        toShow.style.animationName = '';
        toShow.style.animationDuration = '';
    }, duration + 500);
};