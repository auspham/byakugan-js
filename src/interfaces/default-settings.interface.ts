import { Callbacks } from './callbacks.interface';

export interface DefaultSettings {
    grid      : Array<Array<number>>;
    diagonal  : boolean;
    normal    : number;
    obstacle  : number;
    callbacks?: Callbacks;
}