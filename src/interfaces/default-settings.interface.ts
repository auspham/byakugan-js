import { Callbacks } from './callbacks.interface';

export interface DefaultSettings {
    grid      : Array<Array<number>>;
    diagonal  : boolean;
    all       : boolean;
    normal    : number;
    obstacle  : number;
    start     : number;
    goal      : number;
    callbacks?: Callbacks;
}