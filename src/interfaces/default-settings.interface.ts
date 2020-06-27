import { Callbacks } from './callbacks.interface';

export interface DefaultSettings {
    grid      : Array<Array<number>>;
    diagonal  : boolean | false;
    normal    : number | 0;
    obstacle  : number | 1;
    start     : number | 2;
    goal      : number | 3;
    callbacks?: Callbacks;
}