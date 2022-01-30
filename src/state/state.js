export class State {
    constructor(content) {
        this.content = content;
    }

    static change(content) {
        return new State(content);
    }
    refresh = () => {
        const mainContent = document.querySelector('#main-content');
        let toBeReplaced = Array.from(mainContent.childNodes);
        toBeReplaced.forEach(thing => {
            mainContent.removeChild(thing);
        });
        mainContent.appendChild(this.content);
    };
}