import { Callbacks } from './callbacks.interface';
import { HeuristicsInterface } from './heuristics.interface';
/**
 * List of available settings.
 *
 * @export
 * @interface SettingsInterface
 */
export interface SettingsInterface {
    grid      : Array<Array<number>>;
    diagonal  : boolean;
    obstacles : Array<number>;
    heuristics: HeuristicsInterface;
    callbacks?: Callbacks;
}