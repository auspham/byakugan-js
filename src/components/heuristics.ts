import { HeuristicsInterface } from "../interfaces/heuristics.interface"
import { ErrorMessage } from "./errors";
import { Node } from "./node";

/**
 * Default heuristic function are Manhattan for normal (4 directions)
 * and Octile for diagonal (8 directions) as suggested by:
 * http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
 *
 * @enum {number}
 */
enum DefaultFunctions {
    normal = "MANHATTAN",
    diagonal = "OCTILE"
}

/**
 * Configure heuristic functions. The default functions are:
 * - Euclidean
 * - Manhattan
 * - Octile
 * Use overwrites to overwrite any function.
 *
 * @export
 * @class Heuristics
 */
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
            if(heuristics.override) {
               this.setOverwrite(heuristics.override);
            } else {
                this.setFunctions(heuristics);
            }
        }
    }

    private setOverwrite(override: HeuristicsInterface["override"]): void {
        const { normal, diagonal } = override;

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
