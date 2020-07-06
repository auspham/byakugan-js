import { Callbacks } from './callbacks.interface';

export interface DefaultSettings {
    grid      : Array<Array<number>>;
    diagonal  : boolean;
    obstacle  : number;
    callbacks?: Callbacks;
}