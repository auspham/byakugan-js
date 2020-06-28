import { Settings } from "./components/settings";
import { Node } from "./components/node";
import { Result } from "./components/result";

export class Byakugan {
    private settings: Settings;
    private grid    : Array<Array<Node>>;
    private starts  : Array<Node>;
    private ends    : Array<Node>;
    private results : Array<Result>;

    constructor(settings: Settings) {
        this.settings = settings;
        this.starts   = [];
        this.ends     = [];
        this.constructNode(settings.grid);
    }

    constructNode(grid: Array<Array<number>>): void {
        for (let row: number = 0; row < grid.length; row++) {
            for (let col: number = 0; col < grid[0].length; col++) {
                let val: number = grid[row][col];
                // NOTE: this.grid still undefined;
                this.grid[row][col] = new Node(
                    row,
                    col,
                    this.grid,
                    this.settings.diagonal,
                    val == this.settings.obstacle,
                    val == this.settings.start,
                    val == this.settings.goal,
                    this.settings.callbacks
                );

                if (val == this.settings.start) {
                    this.starts.push(this.grid[row][col]);
                }

                if (val == this.settings.goal) {
                    this.ends.push(this.grid[row][col]);
                }
            }
        }

        for (let row: number = 0; row < this.grid.length; row++) {
            for (let col: number = 0; col < this.grid[0].length; col++) {
                this.grid[row][col].addNeighbours();
            }
        }

        this.search();
    }

    distance(a: Node, b: Node): number {
        return Math.hypot(a.row - b.row, a.col - b.col);
    }

    popShortest(startNode: Node, endNodes: Array<Node>): Node | null {
        let smallestDistance: number = Infinity;
        let shortestEnd: Node = null;

        for (let i: number = 0; i < endNodes.length; i++) {
            let end: Node = endNodes[i];
            let distance: number = this.distance(startNode, end);
            if (distance < smallestDistance) {
                smallestDistance = distance;
                shortestEnd = end;
            }
        }

        if (shortestEnd) {
            let _remove = endNodes.indexOf(shortestEnd);
            endNodes = endNodes.slice(_remove, 1);
        }

        return shortestEnd;
    }

    search(): Array<Result> {
        for (let i: number = 0; i < this.starts.length; i++) {
            let startNode: Node = this.starts[i];
            let endNodes : Array<Node> = this.ends;
            let openSet  : Array<Node> = [startNode];
            let closeSet : Array<Node> = [];
            let end      : Node | null;

            while ((end = this.popShortest(startNode, endNodes)) !== null) {
                let result : Result = new Result(startNode);

                while (openSet.length > 0) {
                    let current = null;

                    for (let i = 0; i < openSet.length; i++) {
                        if (!current.f || openSet[i].f < current.f) {
                            current = openSet[i];
                        }
                    }

                    if (current.goal) {
                        openSet = [startNode];
                        result.addResult(current);
                    }

                    const _remove = openSet.indexOf(current);
                    let [remove] = openSet.splice(_remove, 1);
                    closeSet.push(remove);

                    for (let i = 0; i < current.neighbours.length; i++) {
                        let neighbour = current.neighbours[i];
                        let tempG =
                            current.g + this.distance(current, neighbour);

                        if (neighbour.obstacle || closeSet.includes(neighbour))
                            continue;
                        if (tempG > neighbour.g) {
                            neighbour.updateScore(
                                tempG,
                                this.distance(neighbour, end)
                            );
                            neighbour.previous = current;

                            if (!openSet.includes(neighbour)) {
                                openSet.push(neighbour);
                            }
                        }
                    }
                }

                this.results.push(result);
            }
        }
        return this.results;
    }
}
