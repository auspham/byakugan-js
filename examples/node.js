const Byakugan = require('../build/index');

let settings = {
    grid: [
        [1, 2, 0, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 1, 0],
        [1, 3, 0, 0],
      
    ],
    all: true,
    diagonal: false,
}
console.log(Byakugan)
let a = new Byakugan(settings)
a.search();