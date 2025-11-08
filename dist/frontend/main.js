/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/frontend/engine.ts":
/*!********************************!*\
  !*** ./src/frontend/engine.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Engine: () => (/* binding */ Engine)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Engine = /** @class */ (function () {
    // Constructor doesn't have too much to do, since the setup happens later (in user code).
    function Engine() {
        var _this = this;
        // somewhere to stash the user-provided event handlers
        this.listeners = {};
        // somewhere to stash the loaded images
        this.loadedImages = {};
        this.waitingForImages = false;
        // page elements
        this.textBox = document.getElementById("textBox");
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        // some sensible defaults
        this.tileSize = 20;
        this.tilesWide = 20;
        this.tilesHigh = 20;
        this.render = function () {
            console.log("This is a placeholder rendering function -- make sure to assign your own render function using `engine.setupView`.");
        };
        // Resize the canvas based on the default tile size/quantity. (This will be re-done if the user asks for a different tile size or quantity.)
        this.canvas.width = this.tilesWide * this.tileSize;
        this.canvas.height = this.tilesHigh * this.tileSize;
        document.addEventListener("keydown", function (event) {
            if (event.code in _this.listeners) {
                _this.listeners[event.code]();
                // clear the frame
                _this.ctx.clearRect(0, 0, _this.tilesWide * _this.tileSize, _this.tilesHigh * _this.tileSize);
                // and render whatever we're supposed to render
                _this.render();
            }
        });
    }
    // Internal helper function to load images from a list of image names.
    Engine.prototype.loadImages = function (listOfImages) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Loading images...");
                        return [4 /*yield*/, Promise.all(listOfImages.map(function (imageName) {
                                if (!(imageName in _this.loadedImages)) {
                                    _this.loadedImages[imageName] = new Image(); // Create new img element
                                    var promise = new Promise(function (resolve) { return _this.loadedImages[imageName].addEventListener("load", resolve); }); // set up the Promise to wait for (so we'll know when we're done)
                                    _this.loadedImages[imageName].src = imageName + ".png"; // Set source path
                                    return promise;
                                }
                            }))];
                    case 1:
                        _a.sent();
                        console.log("Images loaded: " + listOfImages.join(", "));
                        this.waitingForImages = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    // ====================================================================================
    // The user of this class should *only* need to refer to the functions below this line.
    // ====================================================================================
    // setupView sets up everything view-specific. The argument should be an object with the following keys:
    // 		"tileSize": size of each tile, in pixels 
    // 		"tilesWide": width of the world, in tiles
    // 		"tileHigh": width of the world, in tiles
    // 		"render": your function to render the world (the main function of your View)
    // 		"imagesToLoad": if you are using drawTileAt to draw image tiles in your renderer, you must provide a list of the image names here. These names are how you refer to them in with the drawTileAt function, and they should be the *same* as the name of an actual .png file stored in the same directory as the rest of the project files.
    Engine.prototype.setupView = function (viewInfo) {
        if ("tileSize" in viewInfo)
            this.tileSize = viewInfo.tileSize;
        if ("tilesWide" in viewInfo)
            this.tilesWide = viewInfo.tilesWide;
        if ("tilesHigh" in viewInfo)
            this.tilesHigh = viewInfo.tilesHigh;
        this.canvas.width = this.tilesWide * this.tileSize;
        this.canvas.height = this.tilesHigh * this.tileSize;
        if ("render" in viewInfo)
            this.render = viewInfo.render;
        if ("imagesToLoad" in viewInfo) {
            this.waitingForImages = true;
            this.loadImages(viewInfo.imagesToLoad);
        }
    };
    // setupController registers the possible event handlers.
    // The argument should be an object with keys corresponding to:
    // - "start" for your game-starting code
    // - one for each of the keycodes (https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code) you want to use; for example, the keycode for the "1" key is "Digit1" and the keycode for the "a" key is "KeyA".
    Engine.prototype.setupController = function (controllerInfo) {
        this.listeners = controllerInfo;
    };
    // startGame will wait until the images are all loaded, then run your registered "start" function and your renderer.
    Engine.prototype.startGame = function () {
        var _this = this;
        // If it's still waiting on images to load, wait and try again 100ms later. 
        if (this.waitingForImages) {
            setTimeout(function () { return _this.startGame(); }, 100);
        }
        else {
            this.listeners.start();
            this.render();
        }
    };
    // Write text into the textBox element. Because it is done with "innerText", you can use html elements (such as <br> for a linebreak) in it, if you want.
    Engine.prototype.writeText = function (text) {
        this.textBox.innerText = text;
    };
    // Fill the tile at this x, y location with the given color. 
    // Remember that x and y have their origin at the top left, so (0,0) is the top-left-most tile, (0,1) is the next one down, etc.
    // The color can be any string that can be parsed as a CSS color value. For example:
    // a hex string: "11eaea"
    // an RGB specification "rgb(17, 234, 234)"
    // an HSLA specification "hsla(180deg, 86%, 49%, 0.5)"
    Engine.prototype.fillTile = function (x, y, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
    };
    // At location x, y, draw the image with this filename (without ".png").
    // Remember that if you want to use this, you need to load your images in your call to setupView.
    // png files can have transparent parts, so you may find it useful to layer them onto the same tile. If you imagine them as layers (like in Photoshop), you need to draw the lower layers before the upper layers.
    // Your tile images probably *should* be the same size as the tileSize that you set in setupView (it seems easier to think about?), but technically there's nothing enforcing this. 
    Engine.prototype.drawTileAt = function (x, y, imageName) {
        if (!(imageName in this.loadedImages)) {
            console.warn("Image was not loaded: " + imageName);
        }
        else {
            this.ctx.drawImage(this.loadedImages[imageName], x * this.tileSize, y * this.tileSize);
        }
    };
    return Engine;
}());



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./src/frontend/main.ts ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./engine */ "./src/frontend/engine.ts");

var engine = new _engine__WEBPACK_IMPORTED_MODULE_0__.Engine();
// This function will be run when the page loads. It will handle making new elements, attaching event listeners, etc. 
// We are going to build a calculator 
window.onload = function () {
    var canvas = document.getElementById("gameCanvas");
    var draw = canvas.getContext("2d");
    var drawingCurrentPicAtX = 0;
    var drawingCurrentPicAtY = 0;
    // Start loading images so engine.loadedImages["a"] is defined
    engine.setupView({
        tileSize: 9,
        tilesWide: 85,
        tilesHigh: 85,
        imagesToLoad: ["a", "n", "e", "l", "i", "o", "r", "s", "h"],
        render: function () { }
    });
    document.addEventListener("keydown", function (event) {
        var img;
        if (event.code == "Digit1") {
            console.log("1!");
            // Safely draw only after the image is available
            img = engine.loadedImages["a"];
        }
        else if (event.code == "Digit2") {
            console.log("2!");
            img = engine.loadedImages["n"];
        }
        else if (event.code == "Digit3") {
            console.log("3!");
            img = engine.loadedImages["e"];
        }
        else if (event.code == "Digit4") {
            console.log("4!");
            img = engine.loadedImages["l"];
        }
        else if (event.code == "Digit5") {
            console.log("5!");
            img = engine.loadedImages["i"];
        }
        else if (event.code == "Digit6") {
            console.log("6!");
            img = engine.loadedImages["o"];
        }
        else if (event.code == "Digit7") {
            console.log("7!");
            img = engine.loadedImages["r"];
        }
        else if (event.code == "Digit8") {
            console.log("8!");
            img = engine.loadedImages["s"];
        }
        else if (event.code == "Digit9") {
            console.log("9!");
            img = engine.loadedImages["h"];
        }
        console.log("Drawing image at ", drawingCurrentPicAtX, drawingCurrentPicAtY);
        var drawNow = function () { return draw.drawImage(img, drawingCurrentPicAtX, drawingCurrentPicAtY, 250, 250); };
        if (img.complete && img.naturalWidth > 0) {
            drawNow();
        }
        else {
            img.addEventListener("load", drawNow, { once: true });
        }
        if (drawingCurrentPicAtX + 250 >= canvas.width) {
            drawingCurrentPicAtX = 0;
            drawingCurrentPicAtY += 250;
        }
        else {
            drawingCurrentPicAtX += 250;
        }
    });
    // If the user hits the space bar, delete the last drawn image
    document.addEventListener("keydown", function (event) {
        if (event.code == "Space") {
            console.log("Space!");
            // Clear the last drawn image
            if (drawingCurrentPicAtX === 0 && drawingCurrentPicAtY === 0) {
                // Nothing to erase
                return;
            }
            if (drawingCurrentPicAtX === 0) {
                drawingCurrentPicAtY -= 250;
                drawingCurrentPicAtX = canvas.width - 250;
            }
            else {
                drawingCurrentPicAtX -= 250;
            }
            draw.clearRect(drawingCurrentPicAtX, drawingCurrentPicAtY, 250, 250);
        }
    });
};

})();

/******/ })()
;
//# sourceMappingURL=main.js.map