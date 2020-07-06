import { Settings } from './settings';
import { Callbacks } from '../interfaces/callbacks.interface';

/**
 * Implementation of node representing a single tile in the grid.
 *
 * @export
 * @class Node
 */
export class Node {
    public row       : number;
    public col       : number;

    private grid      : Array<Array<Node>>;
    private diagonal  : boolean;
    private obstacle  : boolean;
    private neighbours: Array<Node>;

    public previous? : Node;
    public g         : number;
    public h         : number;
    public f         : number;

    constructor(
        row       : number,
        col       : number,
        grid      : Array<Array<Node>>,
        diagonal  : boolean,
        obstacle  : boolean,
        callbacks?: Callbacks,
    ) {
        this.row        = row;
        this.col        = col;
        this.grid       = grid;
        this.obstacle   = obstacle;
        this.diagonal   = diagonal;
        this.neighbours = [];
        this.previous   = null;
        this.g          = this.h = this.f = 0;

        callbacks?.nodeConstructions(this.get());
    }

    /**
     * Add neighbours to the node given the directions.
     *
     * @private
     * @param {*} directions
     * @memberof Node
     */
    private addNeighboursFromDirections(directions): void {
        for (const d in directions) {
			if (directions.hasOwnProperty(d)) {
				const direct: Array<number> = directions[d];
				const _ = { r: this.row + direct[0], c: this.col + direct[1]}
				if ((_.r >= 0 && _.r < this.grid.length) &&
					(_.c >= 0 && _.c < this.grid[0].length)) {
						const neighbour: Node = this.grid[_.r][_.c];
						if (!neighbour.obstacle)
                            this.neighbours.push(neighbour)
				}
			}
		}
    }
    
    /**
     * Prepare the directions and call addNeighboursFromDirections.
     *
     * @memberof Node
     */
    public addNeighbours(): void {
        let directions: Array<Array<number>> = [
			[1, 0],
			[0, -1],
			[0, 1],
			[-1, 0],
		];

		if (this.diagonal) {
			const diagonalsDirection: Array<Array<number>> = [
				[-1, -1],
				[1, 1],
				[1, -1],
				[-1, 1]
			];
			directions = directions.concat(diagonalsDirection);
		}
		
		this.addNeighboursFromDirections(directions);
    }

    /**
     * Reset the scores and the previous node.
     *
     * @memberof Node
     */
    public reset(): void {
        this.f = this.g = this.h = 0;
        this.previous = null;
    }

    /**
     * Update the scores given g, h of a node.
     *
     * @param {number} g
     * @param {number} h
     * @memberof Node
     */
    public updateScore(g: number, h: number): void {
        this.g = g
        this.h = h;
        this.f = g + h;
    }

    /**
     * Return a boolean indicating if the tile is obstacle.
     *
     * @returns {boolean}
     * @memberof Node
     */
    public isObstacle(): boolean {
        return this.obstacle;
    }

    /**
     * Return a Object with row, col, obstacle values.
     *
     * @returns {Object}
     * @memberof Node
     */
    public get(): Object {
        return { row: this.row, col: this.col, obstacle: this.obstacle }
    }
}
