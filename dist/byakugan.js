(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Byakugan = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./components/settings", "./components/node"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var settings_1 = require("./components/settings");
    var node_1 = require("./components/node");
    var Byakugan = (function () {
        function Byakugan(settings) {
            try {
                this.settings = new settings_1.Settings(settings);
                this.grid = [];
                this.constructNode(settings.grid);
            }
            catch (error) {
                console.error(error);
            }
        }
        Byakugan.prototype.isObstacle = function (val, obstacles) {
            return obstacles.has(val);
        };
        Byakugan.prototype.constructNode = function (grid) {
            for (var row = 0; row < grid.length; row++) {
                var _ = [];
                for (var col = 0; col < grid[0].length; col++) {
                    var val = grid[row][col];
                    var newNode = new node_1.Node(row, col, this.grid, this.settings.diagonal, this.isObstacle(val, this.settings.obstacles), this.settings.callbacks);
                    _.push(newNode);
                }
                this.grid.push(_);
            }
            for (var row = 0; row < this.grid.length; row++) {
                for (var col = 0; col < this.grid[0].length; col++) {
                    this.grid[row][col].addNeighbours();
                }
            }
        };
        Byakugan.prototype.distance = function (a, b) {
            var _a = this.settings, diagonal = _a.diagonal, heuristics = _a.heuristics;
            try {
                if (diagonal) {
                    return heuristics.diagonal(a, b);
                }
                return heuristics.normal(a, b);
            }
            catch (error) {
                console.error(error);
            }
        };
        Byakugan.prototype.resetGrid = function () {
            for (var row = 0; row < this.grid.length; row++) {
                for (var col = 0; col < this.grid[0].length; col++) {
                    this.grid[row][col].reset();
                }
            }
        };
        Byakugan.prototype.checkGoal = function (node, end) {
            if (node) {
                return node.col == end.col && node.row == end.row;
            }
        };
        Byakugan.prototype.getResult = function (end) {
            var result = [];
            var current = end;
            while (current.previous) {
                result.unshift([current.row, current.col]);
                current = current.previous;
            }
            return result;
        };
        Byakugan.prototype.search = function (x1, y1, x2, y2) {
            this.resetGrid();
            var start = this.grid[x1][y1];
            var end = this.grid[x2][y2];
            var openSet = [start];
            var closeSet = [];
            while (openSet.length > 0) {
                var current = null;
                for (var i = 0; i < openSet.length; i++) {
                    if (!current || openSet[i].f < current.f) {
                        current = openSet[i];
                    }
                }
                if (this.checkGoal(current, end)) {
                    return this.getResult(current);
                }
                var _remove = openSet.indexOf(current);
                var remove = openSet.splice(_remove, 1)[0];
                closeSet.push(remove);
                for (var i = 0; i < current.neighbours.length; i++) {
                    var neighbour = current.neighbours[i];
                    if (neighbour.isObstacle() || !closeSet.includes(neighbour)) {
                        var tempG = current.g + this.distance(current, neighbour);
                        if (!openSet.includes(neighbour) || tempG < neighbour.g) {
                            neighbour.updateScore(tempG, this.distance(neighbour, end));
                            neighbour.previous = current;
                            if (!openSet.includes(neighbour)) {
                                openSet.push(neighbour);
                            }
                        }
                    }
                }
            }
            return [];
        };
        return Byakugan;
    }());
    exports.default = Byakugan;
});

},{"./components/node":4,"./components/settings":5}],2:[function(require,module,exports){
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ErrorMessage = void 0;
    var ErrorMessage = (function (_super) {
        __extends(ErrorMessage, _super);
        function ErrorMessage() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ErrorMessage.functions = function (name) {
            var message = "Undefined heuristic functions '" + name + "' do you mean to use 'override'?";
            return new Error(message);
        };
        ErrorMessage.invalidSettings = function () {
            var message = "Missing key 'grid' in settings object.";
            return new Error(message);
        };
        return ErrorMessage;
    }(Error));
    exports.ErrorMessage = ErrorMessage;
});

},{}],3:[function(require,module,exports){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./errors"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Heuristics = void 0;
    var errors_1 = require("./errors");
    var DefaultFunctions;
    (function (DefaultFunctions) {
        DefaultFunctions["normal"] = "MANHATTAN";
        DefaultFunctions["diagonal"] = "OCTILE";
    })(DefaultFunctions || (DefaultFunctions = {}));
    var Heuristics = (function () {
        function Heuristics(heuristics) {
            this.functions = {
                EUCLIDEAN: function (a, b) {
                    Math.hypot(a.row - b.row, a.col - b.col);
                },
                MANHATTAN: function (a, b) {
                    var dx = Math.abs(a.col - b.col);
                    var dy = Math.abs(a.row - b.row);
                    return dx + dy;
                },
                OCTILE: function (a, b) {
                    var dx = Math.abs(a.col - b.col);
                    var dy = Math.abs(a.row - b.row);
                    return (dx + dy) + (Math.sqrt(2) - 2) * Math.min(dx, dy);
                }
            };
            this.normal = this.functions[DefaultFunctions.normal];
            this.diagonal = this.functions[DefaultFunctions.diagonal];
            if (heuristics) {
                if (heuristics.override) {
                    this.setOverwrite(heuristics.override);
                }
                else {
                    this.setFunctions(heuristics);
                }
            }
        }
        Heuristics.prototype.setOverwrite = function (override) {
            var normal = override.normal, diagonal = override.diagonal;
            if (normal) {
                this.normal = normal;
            }
            if (diagonal) {
                this.diagonal = diagonal;
            }
        };
        Heuristics.prototype.setFunctions = function (heuristics) {
            var normal = heuristics.normal, diagonal = heuristics.diagonal;
            if (normal) {
                normal = normal.toUpperCase();
                if (this.functions.hasOwnProperty(normal)) {
                    this.normal = this.functions[normal];
                }
                else {
                    throw errors_1.ErrorMessage.functions(normal);
                }
            }
            if (diagonal) {
                diagonal = diagonal.toUpperCase();
                if (this.functions.hasOwnProperty(diagonal)) {
                    this.diagonal = this.functions[diagonal];
                }
                else {
                    throw errors_1.ErrorMessage.functions(diagonal);
                }
            }
        };
        return Heuristics;
    }());
    exports.Heuristics = Heuristics;
});

},{"./errors":2}],4:[function(require,module,exports){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Node = void 0;
    var Node = (function () {
        function Node(row, col, grid, diagonal, obstacle, callbacks) {
            this.row = row;
            this.col = col;
            this.grid = grid;
            this.obstacle = obstacle;
            this.diagonal = diagonal;
            this.neighbours = [];
            this.previous = null;
            this.g = this.h = this.f = 0;
            callbacks === null || callbacks === void 0 ? void 0 : callbacks.nodeConstructions(this.get());
        }
        Node.prototype.addNeighboursFromDirections = function (directions) {
            for (var d in directions) {
                if (directions.hasOwnProperty(d)) {
                    var direct = directions[d];
                    var _ = { r: this.row + direct[0], c: this.col + direct[1] };
                    if ((_.r >= 0 && _.r < this.grid.length) &&
                        (_.c >= 0 && _.c < this.grid[0].length)) {
                        var neighbour = this.grid[_.r][_.c];
                        if (!neighbour.obstacle)
                            this.neighbours.push(neighbour);
                    }
                }
            }
        };
        Node.prototype.addNeighbours = function () {
            var directions = [
                [1, 0],
                [0, -1],
                [0, 1],
                [-1, 0],
            ];
            if (this.diagonal) {
                var diagonalsDirection = [
                    [-1, -1],
                    [1, 1],
                    [1, -1],
                    [-1, 1]
                ];
                directions = directions.concat(diagonalsDirection);
            }
            this.addNeighboursFromDirections(directions);
        };
        Node.prototype.reset = function () {
            this.f = this.g = this.h = 0;
            this.previous = null;
        };
        Node.prototype.updateScore = function (g, h) {
            this.g = g;
            this.h = h;
            this.f = g + h;
        };
        Node.prototype.isObstacle = function () {
            return this.obstacle;
        };
        Node.prototype.get = function () {
            return { row: this.row, col: this.col, obstacle: this.obstacle };
        };
        return Node;
    }());
    exports.Node = Node;
});

},{}],5:[function(require,module,exports){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./heuristics", "./errors"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Settings = void 0;
    var heuristics_1 = require("./heuristics");
    var errors_1 = require("./errors");
    var DefaultType;
    (function (DefaultType) {
        DefaultType[DefaultType["obstacle"] = 1] = "obstacle";
    })(DefaultType || (DefaultType = {}));
    var Settings = (function () {
        function Settings(settings) {
            var _a;
            if (!settings.grid) {
                throw errors_1.ErrorMessage.invalidSettings();
            }
            this.grid = settings.grid;
            this.diagonal = (_a = settings.diagonal) !== null && _a !== void 0 ? _a : false;
            this.obstacles = new Set(settings.obstacles || [DefaultType.obstacle]);
            this.callbacks = settings.callbacks;
            this.setHeuristics(settings.heuristics);
        }
        Settings.prototype.setHeuristics = function (heuristics) {
            this.heuristics = new heuristics_1.Heuristics(heuristics);
        };
        return Settings;
    }());
    exports.Settings = Settings;
});

},{"./errors":2,"./heuristics":3}],6:[function(require,module,exports){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./byakugan"], factory);
    }
})(function (require, exports) {
    "use strict";
    var byakugan_1 = require("./byakugan");
    return byakugan_1.default;
});

},{"./byakugan":1}]},{},[6])(6)
});
