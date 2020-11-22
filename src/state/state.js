export class State {
    constructor(status, content) {
        this.status = status;
        this.content = content;
    }

    static change(status, content) {
        return new State(status, content);
    }
    refresh = () => {
        const mainContent = document.querySelector("#main-content");
        let toBeReplaced = mainContent.firstChild;
        if (toBeReplaced) mainContent.removeChild(toBeReplaced);
        console.log(this.content);
        mainContent.appendChild(this.content);
    }
}