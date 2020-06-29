const { Byakugan } = require('../build');

let settings = {
    grid: [
        [1, 2, 1, 1],
        [1, 0, 0, 1],
        [1, 1, 0, 3],
      
    ],
    diagonal: true,
    callback: function (row, col, obstacle, start, goal) {
        let width = Math.floor(w / this.grid[0].length);
        let height = Math.floor(h / this.grid.length);

        if (obstacle) {
            fill(0);
        } else if (start) {
            fill(0, 0, 255);
        } else if (goal) {
            fill(0, 255, 0);
        } else {
            noFill();
        }

        rect(col * width, row * height, width, height);
    },
}

let b = new Byakugan(settings);
console.log(b.search());