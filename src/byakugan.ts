/**
 *  Byakugan-js
 *  github.com/rockmanvnx6/byakugan
 *  Licensed under the MIT license.
 *
 *  Author: Ngoc Thang Pham (Austin) (@rockmanvnx6)
 */
import { Settings } from "./components/settings";
import { Node } from "./components/node";
import { DefaultSettings } from "./interfaces/default-settings.interface";

export default class Byakugan {
    private settings: Settings;
    private grid: Array<Array<Node>>;

    constructor(settings: DefaultSettings) {
        this.settings = new Settings(settings);
        this.grid = [];
        this.constructNode(settings.grid);
    }

    private isObstacle(val: number, obstacles: Set<number>): boolean {
        return obstacles.has(val);
    }

    /**
     * Construct a grid of nodes based on the 2D array
     * passed from settings and then add neighbours for each node.
     *
     * @private
     * @param {Array<Array<number>>} grid
     * @memberof Byakugan
     */
    private constructNode(grid: Array<Array<number>>): void {
        for (let row: number = 0; row < grid.length; row++) {
            let _: Array<Node> = [];

            for (let col: number = 0; col < grid[0].length; col++) {
                let val: number = grid[row][col];

                let newNode: Node = new Node(
                    row,
                    col,
                    this.grid,
                    this.settings.diagonal,
                    this.isObstacle(val, this.settings.obstacles),
                    this.settings.callbacks
                );

                _.push(newNode);
            }
            this.grid.push(_);
        }

        for (let row: number = 0; row < this.grid.length; row++) {
            for (let col: number = 0; col < this.grid[0].length; col++) {
                this.grid[row][col].addNeighbours();
            }
        }
    }

    /**
     * Calculate the distance between 2 nodes based on theirs positions
     * on the grid.
     *
     * @private
     * @param {Node} a
     * @param {Node} b
     * @returns {number}
     * @memberof Byakugan
     */
    private distance(a: Node, b: Node): number {
        return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
        // return Math.hypot(a.row - b.row, a.col - b.col);
    }

    /**
     * Reset the node values for each node in the grid.
     *
     * @private
     * @memberof Byakugan
     */
    private resetGrid(): void {
        for (let row: number = 0; row < this.grid.length; row++) {
            for (let col: number = 0; col < this.grid[0].length; col++) {
                this.grid[row][col].reset();
            }
        }
    }

    /**
     * Check if a node is goal based on its position.
     *
     * @private
     * @param {Node} node
     * @param {Node} end
     * @returns {boolean}
     * @memberof Byakugan
     */
    private checkGoal(node: Node, end: Node): boolean {
        if (node) {
            return node.col == end.col && node.row == end.row;
        }
    }

    /**
     * Trace back and return a 2D array consisting of
     * the nodes' coordinations.
     *
     * @private
     * @param {Node} end
     * @returns {Array<Array<number>>}
     * @memberof Byakugan
     */
    private getResult(end: Node): Array<Array<number>> {
        let result: Array<Array<number>> = [];
        let current = end;
        while (current.previous) {
            result.unshift([current.row, current.col]);
            current = current.previous;
        }
        return result;
    }

    /**
     * Implementation of A* algorithm. Following the pseudo code
     * from https://en.wikipedia.org/wiki/A*_search_algorithm
     *
     * @param {number} x1
     * @param {number} y1
     * @param {number} x2
     * @param {number} y2
     * @returns {Array<Array<number>>}
     * @memberof Byakugan
     */
    public search(
        x1: number,
        y1: number,
        x2: number,
        y2: number
    ): Array<Array<number>> {
        this.resetGrid();

        let start: Node = this.grid[x1][y1];
        let end: Node = this.grid[x2][y2];
        let openSet: Array<Node> = [start];
        let closeSet: Array<Node> = [];

        while (openSet.length > 0) {
            let current = null;

            for (let i = 0; i < openSet.length; i++) {
                if (!current || openSet[i].f < current.f) {
                    current = openSet[i];
                }
            }

            if (this.checkGoal(current, end)) {
                return this.getResult(current);
            }

            const _remove = openSet.indexOf(current);
            let [remove] = openSet.splice(_remove, 1);
            closeSet.push(remove);

            for (let i = 0; i < current.neighbours.length; i++) {
                let neighbour: Node = current.neighbours[i];

                if (neighbour.isObstacle() || !closeSet.includes(neighbour)) {

                    let tempG: number =
                        current.g + this.distance(current, neighbour);                    
                    
                    if (!openSet.includes(neighbour)) {
                        openSet.push(neighbour);
                    }
                    
                    if (tempG > neighbour.g) {
                        neighbour.updateScore(tempG, this.distance(neighbour, end));
                        neighbour.previous = current;
                    }
                }
            }
        }
        return [];
    }
}
