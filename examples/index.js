let width = window.innerWidth;
let height = 36.25 * width / 100;

let currentPosition = {
    row: 7,
    col: 23,
}

let selectedPosition = null;
let byakugan;
let path = [];
let movePath = [];
let eclipseSize = 500;
let goalPosition = null;

let check = {
    diagonal: true,
    animation: true,
    move: true,
    hideObstacles: true
}

let background = [
    [197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 709, 730, 730, 730, 730, 730, 730, 730, 730, 730, 730, 730, 730],
    [197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 729, 730, 730, 730, 730, 730, 730, 730, 730, 730, 730, 730, 730],
    [197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 730, 730, 712, 730, 730, 730, 730, 730, 730, 730, 730, 730, 730],
    [197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197],
    [197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197],
    [197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197],
    [197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197],
    [197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197],
    [197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197],
    [197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197],
    [197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197],
    [197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197],
]

let layer0 = [
    [197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 709, 730, 730, 730, 730, 730, 730, 730, 730, 730, 730, 730, 730],
    [197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 729, 730, 730, 730, 730, 730, 730, 730, 730, 730, 730, 730, 730],
    [197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 730, 730, 712, 730, 730, 730, 730, 1352, 1055, 1055, 1055, 1055, 1055],
    [197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 1372, 1075, 1075, 1076, 1075, 1076],
    [197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 1392, 1095, 1095, 1096, 1095, 109],
    [197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197],
    [197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197],
    [197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197],
    [197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197],
    [197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197],
    [197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197],
    [197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197, 197],
]

let layer1 = [
    [300, 301, 197, 243, 244, 245, 246, 247, 248, 249, 17, 18, 19, 1126, 991, 710, 1880, 1881, 1882, 1883, 1884, 730, 796, 797, 798, 730, 730],
    [320, 321, 322, 263, 264, 265, 266, 267, 268, 269, 37, 38, 39, 1146, 1031, 1032, 1900, 1901, 1902, 730, 732, 730, 816, 817, 818, 730, 730],
    [340, 341, 342, 283, 284, 285, 286, 287, 288, 289, 57, 58, 59, 1166, 1051, 1052, 1053, 1054, 1831, 1350, 1351, 212, 213, 214, 215, 1055, 1055],
    [360, 361, 97, 303, 304, 305, 306, 307, 308, 309, 77, 78, 79, 605, 1071, 1072, 1073, 1074, 1851, 1370, 1371, 232, 233, 234, 235, 212, 213],
    [611, 611, 612, 323, 324, 325, 326, 327, 328, 329, 331, 332, 197, 645, 646, 1092, 1093, 1094, 1871, 1390, 1391, 252, 253, 254, 255, 232, 233],
    [707, 725, 632, 343, 344, 345, 346, 347, 348, 349, 351, 352, 197, 197, 606, 197, 197, 197, 197, 197, 197, 272, 273, 274, 275, 252, 253],
    [727, 706, 632, 363, 364, 365, 366, 367, 368, 369, 371, 372, 197, 197, 197, 197, 197, 665, 666, 197, 197, 292, 293, 294, 295, 272, 273],
    [670, 671, 632, 158, 197, 844, 845, 846, 197, 4, 197, 197, 197, 197, 197, 197, 197, 685, 686, 197, 197, 197, 197, 314, 315, 292, 293],
    [690, 691, 632, 159, 197, 864, 865, 866, 197, 24, 197, 212, 213, 214, 215, 197, 197, 197, 197, 197, 212, 213, 214, 215, 197, 197, 197],
    [708, 707, 632, 157, 311, 197, 197, 197, 197, 197, 197, 232, 233, 234, 235, 197, 197, 197, 197, 197, 232, 233, 234, 235, 212, 213, 214],
    [707, 748, 632, 212, 213, 214, 215, 212, 213, 214, 215, 252, 253, 254, 255, 610, 611, 612, 256, 257, 252, 253, 254, 255, 232, 233, 234],
    [707, 707, 632, 232, 233, 234, 235, 232, 233, 234, 235, 272, 273, 274, 275, 630, 747, 632, 276, 277, 272, 273, 274, 275, 252, 253, 254]
]

let grid = [
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1],
    [1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1],
]

let bSize = width / (grid[0].length);
let bSizeH = height / grid.length;

let dom = document.querySelector("#byakugan");
let effect = document.querySelector(".effect");
let selected = false;

let sketch = function (p) {
    let img;

    let render = function (grid) {
        for(let i = 0; i < grid.length; i++) {
            for(let j = 0; j < grid[i].length; j++) {
                let val = grid[i][j];
                drawTile(val, i, j);
                p.stroke(50);
            }
        }
    }

    let drawTile = function (val, i, j) {
        let size = 16;
        let col = img.width / size;
        p.image(
            img,
            (bSize) * j,
            (bSizeH) * i,
            bSize,
            bSizeH,
            size * (val % col),
            size * (Math.floor(val / col)),
            size,
            size
        );
    }
    
  
    p.setup = function() {
        p.createCanvas(width, height);
        p.frameRate(20);
    }
    
    p.draw = function() {
        let settings = {
            grid: grid,
            diagonal: check.diagonal,
            heuristics: {
                normal: "euclidean",
                override: {
                    normal: function(a, b) {
                        let dx = Math.abs(a.col - b.col);
                        let dy = Math.abs(a.row - b.row);
                        return 0.5 * (dx+dy);
                    }
                }
            },
            callbacks: {
                nodeConstructions: function(node) {
                    let x = node.col * (bSize);
                    let y = node.row * (bSizeH);

                    if((p.mouseX > x && p.mouseX < x + bSize) && (p.mouseY > y && p.mouseY < y + bSizeH)) {
                        p.fill(`rgba(0,255,0, 0.4)`);
                        p.noStroke();
                        selectedPosition = Object.assign(node);
                    }
                    if (node.obstacle) {
                        let alpha = 0.4;
                        if(check.hideObstacles) {
                            alpha = 0
                        }
                        p.fill(`rgba(255,0,0, ${alpha})`);
                    } else {
                        p.noFill();
                    }
                    p.strokeWeight(1);
                    p.stroke(50);
                    p.rect(x,y, bSize, bSizeH);
                }
            }
        }

        render(background);
        render(layer0);
        render(layer1);

        byakugan = new Byakugan(settings);
        let pWidth = 2.4 * bSize;
        let pHeight =  3 * bSizeH;
        let random =  Math.floor(Math.random() * Math.floor(2));

        p.fill(255,255,0);
        p.rect(currentPosition.col * (bSize), currentPosition.row * (bSizeH), bSize, bSizeH);
        p.image(player, currentPosition.col * (bSize) - pWidth / 3, currentPosition.row * (bSizeH) - pHeight / 1.5, pWidth, pHeight, random * 72, 0, 72, 72);
        
        movePath.forEach(node => {
            const [row,col] = node;
            p.fill(`rgba(0, 255, 255, .5)`);
            p.rect(col * (bSize), row * (bSizeH), bSize, bSizeH)
        });
        if(path.length > 0) {
            let move = path.shift();
            const [row, col] = move;
            movePath.push(move);
            p.fill(`rgba(0, 255, 255, .5)`);
            p.rect(col * (bSize), row * (bSizeH), bSize, bSizeH)
        } else {
            dom.classList.remove('active');
            if(check.move && movePath.length > 0) {
                let move = movePath.shift();
                const [row, col] = move;
                currentPosition.col = col;
                currentPosition.row = row;   
            }
        }
        p.strokeWeight(5)
        p.noFill();
        if(eclipseSize > 0) {
            eclipseSize-=100;
        }
        if(check.animation) {
 
            p.ellipse(currentPosition.col * (bSize) + eclipseSize/10, currentPosition.row * (bSizeH) - eclipseSize/10, eclipseSize);
        }
        if(selectedPosition && !selectedPosition.obstacle) {
          
            p.rect(selectedPosition.col * (bSize), selectedPosition.row * (bSizeH), bSize, bSizeH)
        };
        if(goalPosition) {
            p.stroke(0,255,0);
            p.rect(goalPosition.col * (bSize), goalPosition.row * (bSizeH), bSize, bSizeH)
        }

    }

    p.mouseClicked = function () {
        if(selectedPosition && !selectedPosition.obstacle && p.mouseY < height) {
            selected = true;
            goalPosition = selectedPosition;
        } else {
            path = [];
            selected = false;
        }
    }

    let start = function () {
        let time = 0;
        if(check.animation) {
            document.querySelector(".effect-img").setAttribute("src", "./assets/byakugan.webp")
            effect.style.display = 'block';
            time = 2700;
        }
        setTimeout(function () {
            movePath = [];
            path = byakugan.search(currentPosition.row, currentPosition.col, goalPosition.row, goalPosition.col);
            eclipseSize = 500;
            if(check.animation) {
                dom.classList.add('active');
            }
            effect.style.display = 'none';
            document.querySelector(".effect-img").setAttribute("src", "")

        }, time)     
       
    }

    p.preload = function () {
        img = p.loadImage('./assets/tiles.png');
        player = p.loadImage('./assets/coder.png');
    }

    p.windowResized = function () {
        width = window.innerWidth;
        height = 36.25 * width / 100;
        bSize = width / (grid[0].length);
        bSizeH = height / grid.length;
        p.resizeCanvas(width, height);
    }

    let btn = document.querySelector('button');
    btn.addEventListener('click', start, false)

}

new p5(sketch, 'byakugan');


let checkbtn = {
    diagonal: document.getElementById("check-diagonal"),
    animation: document.getElementById("check-animation"),
    move: document.getElementById("check-move"),
    hideObstacles: document.getElementById("check-obstacles"),
}

for (let key in checkbtn) {
    if (checkbtn.hasOwnProperty(key)) {
        checkbtn[key].addEventListener("click", () => {
            check[key] = !check[key]
        }, false)
    }
}

