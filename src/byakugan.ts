import { Settings } from "./components/settings";
import { Node } from "./components/node";
import { Result } from "./components/result";
import { DefaultSettings } from "./interfaces/default-settings.interface";

export default class Byakugan {
    private settings: Settings;
    private grid: Array<Array<Array<Node>>>;
    private starts: Array<Node>;
    private ends: Array<Node>;
    private results: Array<Result>;

    constructor(settings: DefaultSettings) {
        this.settings = new Settings(settings);
        this.starts = [];
        this.ends = [];
        this.results = [];
        this.grid = [];
        this.constructNode(settings.grid);
    }

    constructNode(grid: Array<Array<number>>): void {
        let startNodeCoords: Map<number, Array<number>> = new Map<number, Array<number>>();
        let iter = startNodeCoords.entries();

        for (let row: number = 0; row < grid.length; row++) {
            for (let col: number = 0; col < grid[0].length; col++) {
                let val: number = grid[row][col];
                if ( val == this.settings.start ) {
                    let coords: number[] = [row, col];
                    if (startNodeCoords.get(row + col) !== null) {
                        startNodeCoords.set(row + col, coords);
                    }
                }
            }
        }

        for (let i = 0; i < startNodeCoords.size; i++) {
            let tempGrid: Array<Array<Node>> = [];

            for (let row: number = 0; row < grid.length; row++) {
                let _: Array<Node> = [];
    
                for (let col: number = 0; col < grid[0].length; col++) {
                    let val: number = grid[row][col];
    
                    let newNode: Node = new Node(
                        row,
                        col,
                        tempGrid,
                        this.settings.diagonal,
                        val == this.settings.obstacle,
                        val == this.settings.start,
                        val == this.settings.goal,
                        this.settings.callbacks
                    );
    
                    _.push(newNode);
                    
                    if (i == 0) {
                        if (val == this.settings.goal) {
                            this.ends.push(newNode);
                        }
                    }
                }
                tempGrid.push(_);
            }

            const [row, col] = iter.next().value[1];

            this.starts.push(tempGrid[row][col]);
            this.grid.push(tempGrid);
        }

        for (let i = 0; i < startNodeCoords.size; i++) {
            for (let row: number = 0; row < this.grid[i].length; row++) {
                for (let col: number = 0; col < this.grid[i][0].length; col++) {
                    this.grid[i][row][col].addNeighbours();
                }
            }
            
        }
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
            endNodes.splice(_remove, 1);
        }

        return shortestEnd;
    }

    search(): Array<Result> {
        for (let _: number = 0; _ < this.starts.length; _++) {
            let startNode: Node = this.starts[_];
            let endNodes: Array<Node> = [...this.ends];
            let openSet: Array<Node> = [startNode];
            let closeSet: Array<Node> = [];
            let end: Node | null;
            let result: Result = new Result(startNode);
            let i: number = 0;

            while ((end = this.popShortest(startNode, endNodes)) !== null) {
                if(!this.settings.all) {
                    endNodes = [];
                }
                while (openSet.length > 0) {
                    let current = null;

                    for (let j = 0; j < openSet.length; j++) {
                        if (!current || openSet[j].f < current.f) {
                            current = openSet[j];
                        }
                    }

                    if (current.goal) {
                        openSet = [startNode];
                        closeSet = [];
                        result.addResult(current);
                        break;
                    }

                    const _remove = openSet.indexOf(current);
                    let [remove] = openSet.splice(_remove, 1);
                    closeSet.push(remove);

                    for (let j = 0; j < current.neighbours.length; j++) {
                        let neighbour: Node = current.neighbours[j];

                        let tempG: number =
                            current.getGScore(i) +
                            this.distance(current, neighbour);

                        if (
                            neighbour.isObstacle() ||
                            closeSet.includes(neighbour)
                        ) {
                            continue;
                        }

                        if (tempG > neighbour.getGScore(i)) {
                            neighbour.updateScore(
                                tempG,
                                this.distance(neighbour, end),
                                i
                            );
                            neighbour.previous = current;

                            if (!openSet.includes(neighbour)) {
                                openSet.push(neighbour);
                            }
                        }
                    }
                }
                i++;
            }
            this.results.push(result);
        }
        return this.results;
    }
}

