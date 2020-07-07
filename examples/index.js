let width = 800;
let height = 400;

let grid = [
    [197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 198],
    [197, 199, 198, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197],
    [197, 198, 199, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197],
    [197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197],
    [197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197],
    [197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197],
    [197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197],
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


