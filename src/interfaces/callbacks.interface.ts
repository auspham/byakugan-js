import { Node } from '../components/node';

/**
 * List of available callbacks.
 *
 * @export
 * @interface Callbacks
 */
export interface Callbacks {
    nodeConstructions?: (node: Object) => any;
}