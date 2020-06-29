import { DefaultSettings } from '../interfaces/default-settings.interface';
import { Callbacks } from '../interfaces/callbacks.interface';

enum DefaultType {
    normal   = 0,
    obstacle = 1,
    start    = 2,
    goal     = 3,
}

export class Settings {
    public grid     : Array<Array<number>>;
    public diagonal : boolean;
    public all      : boolean;
    public normal   : number;
    public obstacle : number;
    public start    : number;
    public goal     : number;
    public callbacks: Callbacks;

    constructor(settings: DefaultSettings) {
        this.grid      = settings.grid;
        this.diagonal  = settings.diagonal ?? false;
        this.all       = settings.all ?? false;
        this.normal    = settings.normal ?? DefaultType.normal;
        this.obstacle  = settings.obstacle ?? DefaultType.obstacle;
        this.start     = settings.start ?? DefaultType.start;
        this.goal      = settings.goal ?? DefaultType.goal;
        this.callbacks = settings.callbacks;
    }
}