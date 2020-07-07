let img;

function setup() {
    console.log("aaa");
    createCanvas(768, 768);
    image(img, 0, 0, img.width, img.height);
    let bsize = 48;
    let row = img.width / bsize;
    let col = img.height / bsize;
    let count = 0;
    for(let i = 0; i < row; i++) {
        for(let j = 0; j < col; j++) {
            stroke(0);
            noFill();
            rect(j * bsize, i * bsize, bsize, bsize);
            fill(0,255,0);
            text(count, j * bsize, i * bsize, CENTER, CENTER);
            count++;
        }
    }
}

function preload() {
    img = loadImage("./assets/48x48.png");
}