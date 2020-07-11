import { HeuristicsInterface } from "../interfaces/heuristics.interface"
import { ErrorMessage } from "./errors";
import { Node } from "./node";

enum DefaultFunctions {
    normal = "MANHATTAN",
    diagonal = "OCTILE"
}

export class Heuristics {
    public normal  : (a: Node, b: Node) => number;
    public diagonal: (a: Node, b: Node) => number;

    private functions: Object = {
        EUCLIDEAN: (a: Node, b: Node) => {
            Math.hypot(a.row - b.row, a.col - b.col);
        },
        MANHATTAN: (a: Node, b: Node) => {
            let dx = Math.abs(a.col - b.col);
            let dy = Math.abs(a.row - b.row);
            return dx + dy;
        },
        OCTILE: (a: Node, b: Node) => {
            let dx = Math.abs(a.col - b.col);
            let dy = Math.abs(a.row - b.row);
            return (dx + dy) + (Math.sqrt(2) - 2) * Math.min(dx, dy);
        }
    }

    constructor(heuristics: HeuristicsInterface) {
        // Set ddefault distance functions.
        this.normal   = this.functions[DefaultFunctions.normal];
        this.diagonal = this.functions[DefaultFunctions.diagonal];

        if(heuristics) {
            if(heuristics.overwrite) {
               this.setOverwrite(heuristics.overwrite);
            } else {
                this.setFunctions(heuristics);
            }
        }
    }

    private setOverwrite(overwrite: HeuristicsInterface["overwrite"]): void {
        const { normal, diagonal } = overwrite;

        if (normal) {
            this.normal = normal;
        }
        if (diagonal) {
            this.diagonal = diagonal;
        }
    }

    private setFunctions(heuristics: HeuristicsInterface): void {
        let { normal, diagonal } = heuristics;

        if (normal) {
            normal = normal.toUpperCase();
            if (this.functions.hasOwnProperty(normal)) {
                this.normal = this.functions[normal];
            } else {
                throw ErrorMessage.functions(normal);
            }
        }

        if (diagonal) {
            diagonal = diagonal.toUpperCase();
            if(this.functions.hasOwnProperty(diagonal)) {
                this.diagonal = this.functions[diagonal];
            } else {
                throw ErrorMessage.functions(diagonal);
            }
        }
    }
}
