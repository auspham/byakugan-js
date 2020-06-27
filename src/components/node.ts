import { Settings } from './settings';

export class Node {
    private row      : number;
    private col      : number;
    private settings : Settings;
    private obstacle : boolean;
    private start    : boolean;
    private goal     : boolean;
    private end      : boolean;
    private neighbors: Array<Node>;
    private previous?: Node;
    private g        : number;
    private h        : number;
    private f        : number;
    
    constructor(
        row     : number,
        col     : number,
        settings: Settings,
        obstacle: boolean,
        start   : boolean,
        goal    : boolean
    ) {
        this.row       = row;
        this.col       = col;
        this.settings  = settings;
        this.obstacle  = obstacle;
        this.start     = start;
        this.goal      = goal;
        this.neighbors = [];
        this.previous  = null;
        this.g         = this.h = this.f = 0;

        settings.callbacks?.nodeConstructions(this);
    }

    addDirection(directions) {
        for (const d in directions) {
			if (directions.hasOwnProperty(d)) {
				const direct = directions[d];
				const _ = { r: this.row + direct[0], c: this.col + direct[1]}
				if ((_.r >= 0 && _.r < this.settings.grid.length) &&
					(_.c >= 0 && _.c < this.settings.grid[0].length)) {
						const neighbour = this.settings.grid[_.r][_.c];
						if (!neighbour.obstacle)
                            this.neighbours.push(neighbour)
                            // TODO : Default grid has type number, which causes problems
				}
			}
		}
    }
}
