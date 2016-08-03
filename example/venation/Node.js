export default class Node {

    constructor(position, depth = 0) {
        this.position = position;
        this.children = [];
        this.depth = depth;
    }

    addChild(child) {
        this.children.push(child);
    }

    getChildren() {
        return this.children;
    }

    getPosition() {
        return this.position;
    }

    getDepth() {
        return this.depth;
    }

}
