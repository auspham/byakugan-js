import { Settings } from './components/settings';

class Byakugan {
    private settings: Settings;
    private ends    : Array<Node>;

    constructor(settings: Settings) {
        this.settings = settings;
        this.ends     = [];
        this.constructNode(settings.grid);
    }

    constructNode(grid: Array<Array<number>>): void {
        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[0].length; col++) {
                let val = grid[row][col];
                
            }
        }
    }
}