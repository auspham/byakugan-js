import { Node } from '../components/node';

export interface Callbacks {
    nodeConstructions?: (node: Node) => any;
}