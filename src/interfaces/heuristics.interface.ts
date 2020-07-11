
import { Node } from '../components/node';

/**
 * List of available heuristics functions for calculating distance.
 * - Euclidean
 * - Manhattan distance
 * - Octile distance
 *
 * @export
 * @interface Heuristics
 */
export interface HeuristicsInterface {
    normal?  : string;
    diagonal?: string;
    override?: {
        normal?  : (a: Node, b: Node) => number,
        diagonal?: (a: Node, b: Node) => number
    };
}