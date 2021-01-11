/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nvar _a, _b;\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar game_info_1 = __importDefault(__webpack_require__(/*! ./model/game_info */ \"./src/model/game_info.ts\"));\r\nvar tetris_1 = __importDefault(__webpack_require__(/*! ./model/tetris */ \"./src/model/tetris.ts\"));\r\nvar gameInfo;\r\nvar tetris;\r\nvar canvas = document.querySelector(\"#view\");\r\nif (canvas instanceof HTMLCanvasElement) {\r\n    var g = canvas.getContext(\"2d\");\r\n    if (g !== null) {\r\n        start(g);\r\n    }\r\n    else {\r\n        (_a = document.querySelector(\"#fail-msg\")) === null || _a === void 0 ? void 0 : _a.appendChild(new Text(\"Couldn't get CanvasRenderingContext\"));\r\n    }\r\n}\r\nelse {\r\n    (_b = document.querySelector(\"#fail-msg\")) === null || _b === void 0 ? void 0 : _b.appendChild(new Text(\"Couldn't get HTMLCanvasElement\"));\r\n}\r\nfunction init() {\r\n    gameInfo = new game_info_1.default();\r\n    tetris = new tetris_1.default(gameInfo);\r\n    initHandler();\r\n}\r\nfunction start(g) {\r\n    init();\r\n    loop(tetris, g);\r\n}\r\nfunction loop(tetris, g) {\r\n    if (!tetris.gameInfo.over) {\r\n        tetris.update();\r\n        tetris.render(g);\r\n    }\r\n    window.requestAnimationFrame(function () {\r\n        loop(tetris, g);\r\n    });\r\n}\r\nfunction initHandler() {\r\n    window.removeEventListener(\"keydown\", function (event) { });\r\n    window.addEventListener(\"keydown\", function (event) {\r\n        if (!tetris)\r\n            return;\r\n        if (tetris.lockUntilUpdate)\r\n            return;\r\n        switch (event.code) {\r\n            case \"ArrowUp\":\r\n                tetris.rotate();\r\n                break;\r\n            case \"ArrowDown\":\r\n                tetris.move(0, 1);\r\n                break;\r\n            case \"ArrowLeft\":\r\n                tetris.move(-1, 0);\r\n                break;\r\n            case \"ArrowRight\":\r\n                tetris.move(1, 0);\r\n                break;\r\n            case \"Enter\":\r\n                if (tetris.gameInfo.over) {\r\n                    init();\r\n                }\r\n                break;\r\n            case \"Space\":\r\n                tetris.lockUntilUpdate = true;\r\n                tetris.landQuickly();\r\n                break;\r\n            case \"Escape\":\r\n                if (tetris.pause) {\r\n                    tetris.pause = !tetris.pause;\r\n                }\r\n                break;\r\n        }\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack://tetris/./src/main.ts?");

/***/ }),

/***/ "./src/model/block.ts":
/*!****************************!*\
  !*** ./src/model/block.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar block_color_1 = __importDefault(__webpack_require__(/*! ./block_color */ \"./src/model/block_color.ts\"));\r\nvar Block = /** @class */ (function () {\r\n    function Block(color) {\r\n        this.color = color;\r\n    }\r\n    Block.prototype.isEmpty = function () {\r\n        return this.color === block_color_1.default.Empty;\r\n    };\r\n    return Block;\r\n}());\r\nexports.default = Block;\r\n\n\n//# sourceURL=webpack://tetris/./src/model/block.ts?");

/***/ }),

/***/ "./src/model/block_color.ts":
/*!**********************************!*\
  !*** ./src/model/block_color.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar BlockColor;\r\n(function (BlockColor) {\r\n    BlockColor[\"Empty\"] = \"white\";\r\n    BlockColor[\"LightBlue\"] = \"skyblue\";\r\n    BlockColor[\"Yellow\"] = \"gold\";\r\n    BlockColor[\"Green\"] = \"seagreen\";\r\n    BlockColor[\"Red\"] = \"coral\";\r\n    BlockColor[\"Blue\"] = \"royalblue\";\r\n    BlockColor[\"Orange\"] = \"sandybrown\";\r\n    BlockColor[\"Purple\"] = \"darkorchid\";\r\n})(BlockColor || (BlockColor = {}));\r\nexports.default = BlockColor;\r\n\n\n//# sourceURL=webpack://tetris/./src/model/block_color.ts?");

/***/ }),

/***/ "./src/model/block_matrix.ts":
/*!***********************************!*\
  !*** ./src/model/block_matrix.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar block_1 = __importDefault(__webpack_require__(/*! ./block */ \"./src/model/block.ts\"));\r\nvar block_color_1 = __importDefault(__webpack_require__(/*! ./block_color */ \"./src/model/block_color.ts\"));\r\nvar BlockMatrix = /** @class */ (function () {\r\n    function BlockMatrix(width, height) {\r\n        this._width = width;\r\n        this._height = height;\r\n        this.data = Array(this.height);\r\n        for (var y = 0; y < this.height; y++) {\r\n            this.data[y] = Array(this.width);\r\n            for (var x = 0; x < this.width; x++) {\r\n                this.data[y][x] = new block_1.default(block_color_1.default.Empty);\r\n            }\r\n        }\r\n    }\r\n    Object.defineProperty(BlockMatrix.prototype, \"width\", {\r\n        get: function () {\r\n            return this._width;\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(BlockMatrix.prototype, \"height\", {\r\n        get: function () {\r\n            return this._height;\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    BlockMatrix.prototype.blockAt = function (x, y) {\r\n        if (x < 0 || y < 0)\r\n            return null;\r\n        if (x >= this.width || y >= this.height)\r\n            return null;\r\n        return this.data[y][x];\r\n    };\r\n    BlockMatrix.prototype.set = function (x, y, block) {\r\n        if (x < 0 || y < 0)\r\n            return;\r\n        if (x >= this.width || y >= this.height)\r\n            return;\r\n        if (block !== null) {\r\n            this.data[y][x] = block;\r\n        }\r\n    };\r\n    BlockMatrix.prototype.scanAll = function (callback) {\r\n        for (var y = 0; y < this.height; y++) {\r\n            for (var x = 0; x < this.width; x++) {\r\n                callback(x, y, this.blockAt(x, y));\r\n            }\r\n        }\r\n    };\r\n    BlockMatrix.prototype.clone = function () {\r\n        var cloned = new BlockMatrix(this.width, this.height);\r\n        this.scanAll(function (x, y, block) {\r\n            var clonedBlock = cloned.blockAt(x, y);\r\n            if (block !== null && clonedBlock != null) {\r\n                clonedBlock.color = (block.color);\r\n            }\r\n        });\r\n        return cloned;\r\n    };\r\n    return BlockMatrix;\r\n}());\r\nexports.default = BlockMatrix;\r\n\n\n//# sourceURL=webpack://tetris/./src/model/block_matrix.ts?");

/***/ }),

/***/ "./src/model/field.ts":
/*!****************************!*\
  !*** ./src/model/field.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar tetrimino_util_1 = __webpack_require__(/*! ../util/tetrimino_util */ \"./src/util/tetrimino_util.ts\");\r\nvar block_matrix_1 = __importDefault(__webpack_require__(/*! ./block_matrix */ \"./src/model/block_matrix.ts\"));\r\nvar Field = /** @class */ (function () {\r\n    function Field(width, height) {\r\n        if (width === void 0) { width = 10; }\r\n        if (height === void 0) { height = 20; }\r\n        this.width = width;\r\n        this.height = height;\r\n        this.matrix = new block_matrix_1.default(this.width, this.height);\r\n        this.clearLines = [];\r\n    }\r\n    Field.prototype.blockAt = function (x, y) {\r\n        return this.matrix.blockAt(x, y);\r\n    };\r\n    Field.prototype.update = function () {\r\n    };\r\n    Field.prototype.stack = function (tetrimino) {\r\n        return true;\r\n    };\r\n    Field.prototype.overlap = function (tetrimino) {\r\n        return tetrimino_util_1.checkOverlap(this.matrix, tetrimino.shape, tetrimino.x, tetrimino.y);\r\n    };\r\n    return Field;\r\n}());\r\nexports.default = Field;\r\n\n\n//# sourceURL=webpack://tetris/./src/model/field.ts?");

/***/ }),

/***/ "./src/model/game_info.ts":
/*!********************************!*\
  !*** ./src/model/game_info.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar GameInfo = /** @class */ (function () {\r\n    function GameInfo() {\r\n        this.over = false;\r\n        this.lines = 0;\r\n        this.lock = false;\r\n    }\r\n    return GameInfo;\r\n}());\r\nexports.default = GameInfo;\r\n\n\n//# sourceURL=webpack://tetris/./src/model/game_info.ts?");

/***/ }),

/***/ "./src/model/tetrimino.ts":
/*!********************************!*\
  !*** ./src/model/tetrimino.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar tetrimino_util_1 = __webpack_require__(/*! ../util/tetrimino_util */ \"./src/util/tetrimino_util.ts\");\r\nvar Tetrimino = /** @class */ (function () {\r\n    function Tetrimino(shape, x, y) {\r\n        if (x === void 0) { x = 0; }\r\n        if (y === void 0) { y = 0; }\r\n        this.shape = shape;\r\n        this.x = x;\r\n        this.y = y;\r\n    }\r\n    Tetrimino.prototype.update = function (field) {\r\n        return true;\r\n    };\r\n    Tetrimino.prototype.move = function (field, mx, my) {\r\n        return false;\r\n    };\r\n    Tetrimino.prototype.landQuickly = function (field) {\r\n        while (this.move(field, 0, 1))\r\n            ;\r\n    };\r\n    Tetrimino.prototype.rotate = function (field) {\r\n        var rotated = tetrimino_util_1.rotateShape(this.shape);\r\n        if (tetrimino_util_1.checkOverlap(field.matrix, rotated, this.x, this.y)) {\r\n            return false;\r\n        }\r\n        this.shape = rotated;\r\n        return true;\r\n    };\r\n    Tetrimino.prototype.copy = function () {\r\n        return new Tetrimino(this.shape.clone(), this.x, this.y);\r\n    };\r\n    return Tetrimino;\r\n}());\r\nexports.default = Tetrimino;\r\n\n\n//# sourceURL=webpack://tetris/./src/model/tetrimino.ts?");

/***/ }),

/***/ "./src/model/tetrimino_queue.ts":
/*!**************************************!*\
  !*** ./src/model/tetrimino_queue.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar tetrimino_util_1 = __webpack_require__(/*! ../util/tetrimino_util */ \"./src/util/tetrimino_util.ts\");\r\nvar TetriminoQueue = /** @class */ (function () {\r\n    function TetriminoQueue(capacity) {\r\n        if (capacity === void 0) { capacity = 3; }\r\n        this.capacity = capacity;\r\n        this.queue = Array(this.capacity);\r\n    }\r\n    Object.defineProperty(TetriminoQueue.prototype, \"length\", {\r\n        get: function () {\r\n            return this.queue.length;\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    TetriminoQueue.prototype.get = function (i) {\r\n        return this.queue[i];\r\n    };\r\n    TetriminoQueue.prototype.next = function () {\r\n        var first;\r\n        var shift = this.queue.shift();\r\n        if (shift === undefined) {\r\n            this.fill();\r\n            return this.next();\r\n        }\r\n        this.fill();\r\n        first = shift;\r\n        return first;\r\n    };\r\n    TetriminoQueue.prototype.fill = function () {\r\n        for (var i = 0; i < this.capacity; i++) {\r\n            this.queue.push(tetrimino_util_1.randomTetrimino());\r\n        }\r\n    };\r\n    return TetriminoQueue;\r\n}());\r\nexports.default = TetriminoQueue;\r\n\n\n//# sourceURL=webpack://tetris/./src/model/tetrimino_queue.ts?");

/***/ }),

/***/ "./src/model/tetris.ts":
/*!*****************************!*\
  !*** ./src/model/tetris.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar tetrimino_queue_1 = __importDefault(__webpack_require__(/*! ./tetrimino_queue */ \"./src/model/tetrimino_queue.ts\"));\r\nvar field_1 = __importDefault(__webpack_require__(/*! ./field */ \"./src/model/field.ts\"));\r\nvar Tetris = /** @class */ (function () {\r\n    function Tetris(gameInfo) {\r\n        //次のアップデートまで操作を拒否するかどうか\r\n        this.lockUntilUpdate = false;\r\n        this.lastUpdate = Date.now();\r\n        //一時停止しているかどうか\r\n        this.pause = false;\r\n        this.queue = new tetrimino_queue_1.default();\r\n        this.field = new field_1.default();\r\n        this.current = this.queue.next();\r\n        this.gameInfo = gameInfo;\r\n    }\r\n    Tetris.prototype.update = function () {\r\n        this.lockUntilUpdate = false;\r\n        var now = Date.now();\r\n        if (this.pause)\r\n            return;\r\n        if (now - this.lastUpdate < 1000)\r\n            return;\r\n        this.lastUpdate = now;\r\n        this.field.update();\r\n        if (!this.current.update(this.field)) {\r\n            if (!this.field.stack(this.current)) {\r\n                this.gameInfo.over = true;\r\n            }\r\n            else if (this.field.clearLines.length === 0) {\r\n                this.current = this.queue.next();\r\n            }\r\n        }\r\n    };\r\n    Tetris.prototype.render = function (g) {\r\n        g.fillStyle = \"white\";\r\n        g.fillRect(0, 0, 300, 600);\r\n        g.translate(275, 25);\r\n        g.scale(0.5, 0.5);\r\n        g.font = \"bold 24px Comfortaa\";\r\n        g.textAlign = \"center\";\r\n        g.textBaseline = \"alphabetic\";\r\n        for (var i = this.queue.length - 1; i >= 0; i--) {\r\n            var tetrimino = this.queue.get(i);\r\n            g.translate(-(tetrimino.shape.width + 1) * 25, 0);\r\n            //renderTetrimino(tetrimino, 0, 0);\r\n            g.fillStyle = \"#333\";\r\n            g.fillText(\"\" + (i + 1), 0, 0);\r\n        }\r\n    };\r\n    //現在のテトリミノを即座に着地させる\r\n    Tetris.prototype.landQuickly = function () {\r\n        this.current.landQuickly(this.field);\r\n    };\r\n    Tetris.prototype.move = function (mx, my) {\r\n        this.current.move(this.field, mx, my);\r\n    };\r\n    Tetris.prototype.rotate = function () {\r\n        this.current.rotate(this.field);\r\n    };\r\n    return Tetris;\r\n}());\r\nexports.default = Tetris;\r\n\n\n//# sourceURL=webpack://tetris/./src/model/tetris.ts?");

/***/ }),

/***/ "./src/util/tetrimino_util.ts":
/*!************************************!*\
  !*** ./src/util/tetrimino_util.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.defaultTetriminoList = exports.generateTetrimino = exports.checkOverlap = exports.randomTetrimino = exports.rotateShape = void 0;\r\nvar block_color_1 = __importDefault(__webpack_require__(/*! ../model/block_color */ \"./src/model/block_color.ts\"));\r\nvar block_matrix_1 = __importDefault(__webpack_require__(/*! ../model/block_matrix */ \"./src/model/block_matrix.ts\"));\r\nvar tetrimino_1 = __importDefault(__webpack_require__(/*! ../model/tetrimino */ \"./src/model/tetrimino.ts\"));\r\nfunction rotateShape(shape) {\r\n    var rotated = new block_matrix_1.default(shape.height, shape.width);\r\n    for (var y = 0; y < shape.height; y++) {\r\n        for (var x = 0; x < shape.width; x++) {\r\n            var tx = shape.height - y - 1;\r\n            var ty = x;\r\n            rotated.set(tx, ty, shape.blockAt(x, y));\r\n        }\r\n    }\r\n    return rotated;\r\n}\r\nexports.rotateShape = rotateShape;\r\nfunction randomTetrimino() {\r\n    var index = Math.floor(Math.random() * exports.defaultTetriminoList.length);\r\n    return exports.defaultTetriminoList[index].copy();\r\n}\r\nexports.randomTetrimino = randomTetrimino;\r\nfunction checkOverlap(a, b, tx, ty) {\r\n    var overlap = 0;\r\n    a.scanAll(function (x, y, c) {\r\n        var t = b.blockAt(x - tx, y - ty);\r\n        if (c === null || t === null)\r\n            return;\r\n        if (c.isEmpty() || t.isEmpty()) {\r\n            overlap++;\r\n        }\r\n    });\r\n    return overlap !== 0;\r\n}\r\nexports.checkOverlap = checkOverlap;\r\nfunction generateTetrimino(data, color) {\r\n    var width = data.reduce(function (previous, d) { return Math.max(previous, d.length); }, 0);\r\n    var height = data.length;\r\n    var shape = new block_matrix_1.default(width, height);\r\n    for (var y = 0; y < height; y++) {\r\n        for (var x = 0; x < width; x++) {\r\n            var block = shape.blockAt(x, y);\r\n            if (block !== null) {\r\n                block.color = data[y][x] === 0 ? block_color_1.default.Empty : color;\r\n            }\r\n        }\r\n    }\r\n    return new tetrimino_1.default(shape);\r\n}\r\nexports.generateTetrimino = generateTetrimino;\r\nexports.defaultTetriminoList = [\r\n    generateTetrimino([\r\n        [1, 1, 1, 1]\r\n    ], block_color_1.default.LightBlue),\r\n    generateTetrimino([\r\n        [1, 1],\r\n        [1, 1],\r\n    ], block_color_1.default.Yellow),\r\n    generateTetrimino([\r\n        [0, 1, 1],\r\n        [1, 1, 0],\r\n    ], block_color_1.default.Green),\r\n    generateTetrimino([\r\n        [1, 1, 0],\r\n        [0, 1, 1],\r\n    ], block_color_1.default.Red),\r\n    generateTetrimino([\r\n        [1, 0, 0],\r\n        [1, 1, 1],\r\n    ], block_color_1.default.Blue),\r\n    generateTetrimino([\r\n        [0, 0, 1],\r\n        [1, 1, 1],\r\n    ], block_color_1.default.Orange),\r\n    generateTetrimino([\r\n        [0, 1, 0],\r\n        [1, 1, 1],\r\n    ], block_color_1.default.Purple)\r\n];\r\n\n\n//# sourceURL=webpack://tetris/./src/util/tetrimino_util.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/main.ts");
/******/ })()
;