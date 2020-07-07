let width = 800;
let height = 290;

let grid = [
    [300, 301, 197, 243, 244, 245, 246, 247, 248, 249, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 198],
    [320, 321, 322, 263, 264, 265, 266, 267, 268, 269, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197],
    [340, 341, 342, 283, 284, 285, 286, 287, 288, 289, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197],
    [360, 361, 197, 303, 304, 305, 306, 307, 308, 309, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197],
    [197, 197, 197, 323, 324, 325, 326, 327, 328, 329, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197],
    [197, 197, 197, 343, 344, 345, 346, 347, 348, 349, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197],
    [197, 197, 197, 363, 364, 365, 366, 367, 368, 369, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197],
    [197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197],
    [197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197],
    [197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197],
    [197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197],
    [197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197]
]

let sketch = function (p) {
    let img;

    let render = function (grid) {
        for(let i = 0; i < grid.length; i++) {
            for(let j = 0; j < grid[i].length; j++) {
                let val = grid[i][j];
                drawTile(197, i, j);
                drawTile(val, i, j);
            }
        }
    }

    let drawTile = function (val, i, j) {
        let size = 16;
        let col = img.width / size;
        let bSize = width / (grid[0].length);
        let bSizeH = height / grid.length;

        p.image(
            img,
            (bSize) * j,
            (bSizeH) * i,
            bSize,
            bSizeH,
            size * (val % col),
            size * (Math.floor(val / col)) + 0.5,
            size,
            size
        );
    }
    
  
    p.setup = function() {
        p.createCanvas(width, height);
    }
    
    p.draw = function() {
        // p.background(55, 144, 47);
        render(grid);
    }

    p.preload = function () {
        img = p.loadImage('./assets/tiles.png');
    }

    p.windowResized = function () {
        p.resizeCanvas(width, height);
    }

}

new p5(sketch, 'byakugan');

// function setup() {
//     const w = h = 500;
//     let width = 30;
//     let height = 30;
//     createCanvas(w,h);
//     let settings = {
//         grid: [
//             [1, 3, 0, 0],
//             [1, 0, 0, 0],
//             [0, 0, 0, 0],
//             [0, 1, 0, 0],
//             [0, 1, 1, 1],
//             [3, 0, 0, 1],
          
//         ],
//         obstacles: [1,3],
//         diagonal: false,
//         callbacks: {
//             nodeConstructions: function (node) {
//                 console.log(node);
//                 if (node.obstacle) {
//                     fill(0);
//                 } else if (node.start) {
//                     fill(0, 0, 255);
//                 } else if (node.goal) {
//                     fill(0, 255, 0);
//                 } else {
//                     noFill();
//                 }
        
//                 rect(node.col * width, node.row * height, width, height);
//             },
//         }
//     }
    
//     let b = new Byakugan(settings);
//     let res = b.search(0,1,3,3);
//     let res2 = b.search(0,1,5,2);
//     console.log(res);

//     res.forEach(node => {
//         const [row,col] = node;
//         fill(`rgba(0, 255, 0, 0.25)`);
//         rect(col * width, row * height, width, height)
//     })

//     res2.forEach(node => {
//         const [row,col] = node;
//         fill(`rgba(255, 0, 0, 0.25)`);
//         rect(col * width, row * height, width, height)
//     })

// }


