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

    /**
     * Construct a grid of nodes based on the 2D array 
     * passed from settings and then add neighbours for each node.
     *
     * @param {Array<Array<number>>} grid
     * @memberof Byakugan
     */
    constructNode(grid: Array<Array<number>>): void {
        
        for (let row: number = 0; row < grid.length; row++) {
            let _: Array<Node> = [];

            for (let col: number = 0; col < grid[0].length; col++) {
                let val: number = grid[row][col];

                let newNode: Node = new Node(
                    row,
                    col,
                    this.grid,
                    this.settings.diagonal,
                    val == this.settings.obstacle,
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
     * @param {Node} a
     * @param {Node} b
     * @returns {number}
     * @memberof Byakugan
     */
    distance(a: Node, b: Node): number {
        return Math.hypot(a.row - b.row, a.col - b.col);
    }

    /**
     * Reset the node values for each node in the grid.
     *
     * @memberof Byakugan
     */
    resetGrid(): void {
        for (let row: number = 0; row < this.grid.length; row++) {
            for (let col: number = 0; col < this.grid[0].length; col++) {
                this.grid[row][col].reset();
            }
        }
    }

    /**
     * Check if a node is goal based on its position.
     *
     * @param {Node} node
     * @param {Node} end
     * @returns {boolean}
     * @memberof Byakugan
     */
    checkGoal(node: Node, end: Node): boolean {
        if (node) {
            return node.col == end.col && node.row == end.row;
        }
    }

    /**
     * Trace back and return a 2D array consisting of 
     * the nodes' coordinations.
     *
     * @param {Node} end
     * @returns {Array<Array<number>>}
     * @memberof Byakugan
     */
    getResult(end: Node): Array<Array<number>> {
        let result: Array<Array<number>> = [];
        let current = end;
        while(current.previous) {
            result.unshift([current.row, current.col]);
            current = current.previous;
        }
        return result;
    }

    /**
     * Implementation of A* algorithm. Following the pseudo code
     * from https://en.wikipedia.org/wiki/A*_search_algorithm
     *
     * @param {*} x1
     * @param {*} y1
     * @param {*} x2
     * @param {*} y2
     * @returns {Array<Array<number>>}
     * @memberof Byakugan
     */
    search(x1, y1, x2, y2): Array<Array<number>> {
        this.resetGrid();

        let start: Node           = this.grid[x1][y1];
        let end: Node             = this.grid[x2][y2];
        let openSet: Array<Node>  = [start];
        let closeSet: Array<Node> = [];

        while (openSet.length > 0) {
            let current = null;

            for (let j = 0; j < openSet.length; j++) {     
                if (!current || (openSet[j].f < current.f)) {
                    current = openSet[j];
                }
            }
            
            if (this.checkGoal(current, end)) {
                return this.getResult(current);
            }

            const _remove = openSet.indexOf(current);
            let [remove] = openSet.splice(_remove, 1);
            closeSet.push(remove);

            for (let j = 0; j < current.neighbours.length; j++) {
                let neighbour: Node = current.neighbours[j];

                let tempG: number =
                    current.g +
                    this.distance(current, neighbour);
                
                if (
                    neighbour.isObstacle() ||
                    closeSet.includes(neighbour)
                ) {
                    continue;
                }

                if (tempG > neighbour.g) {
                    neighbour.updateScore(
                        tempG,
                        this.distance(neighbour, end),
                    );
                    neighbour.previous = current;

                    if (!openSet.includes(neighbour)) {
                        openSet.push(neighbour);
                    }
                }
            }
        }        
        return [];
    }
}

