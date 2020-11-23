export class State {
    constructor(content) {
        this.content = content;
    }

    static change(content) {
        return new State(content);
    }
    refresh = () => {
        const mainContent = document.querySelector("#main-content");
        let toBeReplaced = mainContent.firstChild;
        if (toBeReplaced) mainContent.removeChild(toBeReplaced);
        console.log(this.content);
        mainContent.appendChild(this.content);
    }
}