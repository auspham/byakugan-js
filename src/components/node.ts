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

    public previous? : Node;
    public g         : Array<number>;
    public h         : Array<number>;
    public f         : Array<number>;
    
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
        this.g          = [0];
        this.h          = [0];
        this.f          = [0];

        callbacks?.nodeConstructions(this);
        // this.initScore();
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

    updateScore(g: number, h: number, i: number): void {
        this.g[i] = g
        this.h[i] = h;
        this.f[i] = g + h;
    }

    getGScore(i: number): number {
        return this.g[i] ? this.g[i] : 0;
    }

    isObstacle(): boolean {
        return this.obstacle;
    }
}
