import { DefaultSettings } from '../interfaces/default-settings.interface';
import { Callbacks } from '../interfaces/callbacks.interface';

enum DefaultType {
    obstacle = 1,
}

/**
 * Convert Javascript settings object to TypeScript class.
 * Stores the default settings of Byakugan.
 *
 * @export
 * @class Settings
 */
export class Settings {
    public grid     : Array<Array<number>>;
    public diagonal : boolean;
    public obstacle : number;
    public callbacks: Callbacks;

    constructor(settings: DefaultSettings) {
        this.grid      = settings.grid;
        this.diagonal  = settings.diagonal ?? false;
        this.obstacle  = settings.obstacle ?? DefaultType.obstacle;
        this.callbacks = settings.callbacks;
    }
}