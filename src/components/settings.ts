import { DefaultSettings } from '../interfaces/default-settings.interface';
import { Callbacks } from '../interfaces/callbacks.interface';

export class Settings {
    public grid     : Array<Array<number>>;
    public diagonal : boolean;
    public normal   : number;
    public obstacle : number;
    public start    : number;
    public goal     : number;
    public callbacks: Callbacks;

    constructor(settings: DefaultSettings) {
        this.grid      = settings.grid;
        this.diagonal  = settings.diagonal;
        this.normal    = settings.normal;
        this.obstacle  = settings.obstacle;
        this.start     = settings.start;
        this.goal      = settings.goal;
        this.callbacks = settings.callbacks;
    }
}