let img;

function setup() {
    createCanvas(img.width, img.height);
    console.log(img.width, img.height)
    image(img, 0, 0, img.width, img.height);
    let bsize = 16;
    let row = img.height / bsize;
    let col = img.width / bsize;
    let count = 0;
    for(let i = 0; i < row; i++) {
        for(let j = 0; j < col; j++) {
            stroke(0);
            noFill();
            // rect(j * bsize, i * bsize, bsize, bsize);
            fill(0,255,0);
            textAlign(CENTER, CENTER);
            textSize(6);
            text(count, j * bsize + bsize / 2, i * bsize + bsize / 2);
            count++;
        }
    }
}

function preload() {
    img = loadImage("./assets/tiles.png");
}