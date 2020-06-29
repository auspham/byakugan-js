import { Node } from './node';

export class Result {
    private start: Node;
    private ends: Array<Node>;

    constructor(start: Node) {
        this.start = start;
        this.ends = [];
    }

    addResult(end: Node): void {
        this.ends.push(end);
    }

    get(): Result {
        return this;
    }
}