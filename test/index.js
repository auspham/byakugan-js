
function setup() {
    const w = h = 500;
    let width = 30;
    let height = 30;
    createCanvas(w,h);
    let settings = {
        grid: [
            [1, 2, 1, 2],
            [1, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [1, 3, 3, 3],
          
        ],
        all: true,
        diagonal: true,
        callbacks: {
            nodeConstructions: function (node) {
               
        
                if (node.obstacle) {
                    fill(0);
                } else if (node.start) {
                    fill(0, 0, 255);
                } else if (node.goal) {
                    fill(0, 255, 0);
                } else {
                    noFill();
                }
        
                rect(node.col * width, node.row * height, width, height);
            },
        }
    }

    settings.callbacks.nodeConstructions.bind(settings);
    
    let b = new Byakugan(settings);
    let res = b.search();
    console.log('res', res)
    let nodeA = res[0].ends
    nodeA.forEach(result => {
        let current = result;
        let random = Math.floor(Math.random() * Math.floor(255));
        console.log('a')
        while(current.previous) {
            fill(`rgba(${random}, ${random}, 0, 0.25)`);
            rect(current.col * width, current.row * height, width, height)
            current = current.previous;
        }
    });
}


