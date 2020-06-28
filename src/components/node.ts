import { Settings } from './settings';
import { Callbacks } from '../interfaces/callbacks.interface';

export class Node {
    public row       : number;
    public col       : number;

    private grid      : Array<Array<Node>>;
    private diagonal  : boolean;
    private obstacle  : boolean;
    private start     : boolean;
    private goal      : boolean;
    private end       : boolean;
    private neighbours: Array<Node>;
    private previous? : Node;

    public g         : number;
    public h         : number;
    public f         : number;
    
    constructor(
        row       : number,
        col       : number,
        grid      : Array<Array<Node>>,
        diagonal  : boolean,
        obstacle  : boolean,
        start     : boolean,
        goal      : boolean,
        callbacks?: Callbacks,
    ) {
        this.row        = row;
        this.col        = col;
        this.grid       = grid;
        this.obstacle   = obstacle;
        this.diagonal   = diagonal;
        this.start      = start;
        this.goal       = goal;
        this.neighbours = [];
        this.previous   = null;
        this.g          = this.h = this.f = 0;

        callbacks?.nodeConstructions(this);
    }

    addDirection(directions): void {
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

    addNeighbours(): void {
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
		
		this.addDirection(directions);
    }

    updateScore(g: number, h: number): void {
        this.g = g;
        this.h = h;
        this.f = g + h;
    }
}
