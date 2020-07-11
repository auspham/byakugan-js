import { SettingsInterface } from "../interfaces/settings.interface";
import { Callbacks } from "../interfaces/callbacks.interface";
import { HeuristicsInterface } from "../interfaces/heuristics.interface";
import { Heuristics } from "./heuristics";

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
    public grid      : Array<Array<number>>;
    public diagonal  : boolean;
    public obstacles : Set<number>;
    public callbacks : Callbacks;
    public heuristics: Heuristics;

    constructor(settings: SettingsInterface) {
        this.grid      = settings.grid;
        this.diagonal  = settings.diagonal ?? false;
        this.obstacles = new Set(settings.obstacles || [DefaultType.obstacle]);
        this.callbacks = settings.callbacks;
        this.setHeuristics(settings.heuristics);
    }

    private setHeuristics(heuristics: HeuristicsInterface): void {
        this.heuristics = new Heuristics(heuristics);
    }
}
