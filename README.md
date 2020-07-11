# Byakugan-js

## Description

Byakugan-js is an array-based, super simple and lightweight implementation of [A*](https://en.wikipedia.org/wiki/A*_search_algorithm) path finding algorithm written in Typescript. 

It's then compiled into JavaScript with ES 5 syntax.

The name [Byakugan](https://naruto.fandom.com/wiki/Byakugan) (白眼) was influenced by the manga series [Naruto](https://en.wikipedia.org/wiki/Naruto).

## Installation:

**Node**: `npm install byakugan-js`

**Web**: Use packages inside `build/` or use one of the following CDNs:

Minified build:

```html
<script src="https://cdn.jsdelivr.net/gh/rockmanvnx6/byakugan-js/dist/byakugan.min.js"></script>
```
normal build
```html
<script src="https://cdn.jsdelivr.net/gh/rockmanvnx6/byakugan-js/dist/byakugan.js"></script>
```



## Quick start

Make sure `Byakugan-js` is installed via `npm` or included using `CDN`.

```js
const Byakugan = require('byakugan-js'); // ignore if using CDN

let settings = {
        grid: [
            [1, 3, 0, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 1, 1],
            [3, 0, 0, 1],
          
        ],
        obstacles: [1,3], // Obstacle tiles
        diagonal: true, // Move diagonally, default false
}
let b = new Byakugan(settings);
let paths = b.search(0,1,3,3);
```

## Methods:

**search(x1, y1, x2, y2)**

> Return a 2D array which contains the coordinates of path.

*Example:*

```js
Byakugan.search(0,1,3,3); // Find path from grid[0][1] to grid[3][3]
```

Return:
```
[ [1,1], [2,1], [2,2], [3,2], [3,3] ]
```

## Settings Object

These are the available keys of the `settings` object

| Key                          | Value                                                        |
| ---------------------------- | ------------------------------------------------------------ |
| grid: `Array<Array<Number>>` | A 2D array describe the grid. **Required**                   |
| obstacles: `Array`           | Array of obstacles value. `Default = [1]`                    |
| diagonal: `boolean`          | `true/false` value to determine if the algorithm can go diagonally. `Default = false` |
| callbacks: `Object`          | An object contain list of callbacks functions.               |
| heuristics: `Object`         | Select heuristic distance functions for type `normal` and `diagonal`. Use `override` to override the heuristic functions. |



## Callbacks

These are the list of available callback functions:

| functions                 | description                                                  |
| ------------------------- | ------------------------------------------------------------ |
| `nodeConstructions(node)` | The function will be called after a node is constructed. It will pass a `object` type as the parameter the object will have the following values: `{ row: number, col: number, isObstacle: boolean}` |

## Heuristics

The available heuristic functions are:

- `Eucludian`
- `Manhattan` (default for `normal` (4 directions) movement)
- `Octile` (default for `diagonal` (8 directions) movement)

The default settings were used based on [this suggestions](*http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html*). Where for diagonal distance, *Octile* distance was chosen with `D = 1`  and `D2 = sqrt(2)`.



To re select/ override a distance function, simply define in the settings object:
```js
let settings = {
    grid: grid,
    heuristics: {
        normal: 'eucludian', // default Manhattan
        override: {
        	diagonal: function (a,b) {
                let dx = Math.abs(a.col - b.col);
                let dy = Math.abs(a.row - b.row);
                return 0.5 * (dx + dy)
            }
    	}
    }
}
```

The above configuration will use `eucludian` distance for `normal` movement and a custom function for `diagonal` movement.



## Development guide:

1. Fork or clone this project.
2. Run `cd byakugan/ && npm install`
3. Run `npm run dev` to develop
4. Run `npm run build` to build
5. Run `npm run test` to test

## Contribution

Contributions are very welcome. Simply fork this project and make [pull requests](https://github.com/rockmanvnx6/byakugan/pulls).



