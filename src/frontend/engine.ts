
export class Engine {
	// somewhere to stash the user-provided event handlers
	listeners : {[index: string]: ()=>void;} = {};

	// somewhere to stash the loaded images
	loadedImages : {[index: string]: HTMLImageElement;} = {};
	waitingForImages : boolean = false;

	// page elements
	textBox = document.getElementById("textBox");
	canvas : HTMLCanvasElement = document.getElementById("gameCanvas") as HTMLCanvasElement;
	ctx = this.canvas.getContext("2d");

	// some sensible defaults
	tileSize : number = 20;
	tilesWide : number = 20;
	tilesHigh : number = 20;
	render : () => void = () => {
			console.log("This is a placeholder rendering function -- make sure to assign your own render function using `engine.setupView`.");
		};

	// Constructor doesn't have too much to do, since the setup happens later (in user code).
	constructor(){
		// Resize the canvas based on the default tile size/quantity. (This will be re-done if the user asks for a different tile size or quantity.)
		this.canvas.width =  this.tilesWide*this.tileSize;
		this.canvas.height = this.tilesHigh*this.tileSize;

		document.addEventListener("keydown", (event) => { 
			if (event.code in this.listeners) {
				this.listeners[event.code]();

				// clear the frame
				this.ctx.clearRect(0, 0, this.tilesWide*this.tileSize, this.tilesHigh*this.tileSize);

				// and render whatever we're supposed to render
				this.render();
			}
		})
	}

	// Internal helper function to load images from a list of image names.
	async loadImages(listOfImages : Array<string>) {
		console.log("Loading images...");
		await Promise.all(listOfImages.map((imageName) => {
			if (! (imageName in this.loadedImages)) {
				this.loadedImages[imageName] = new Image(); // Create new img element
				let promise = new Promise((resolve) => this.loadedImages[imageName].addEventListener("load", resolve)); // set up the Promise to wait for (so we'll know when we're done)
				this.loadedImages[imageName].src = imageName+".png"; // Set source path
				return promise;
			}
		}));
		console.log("Images loaded: "+listOfImages.join(", "));
		this.waitingForImages = false;
	}

// ====================================================================================
// The user of this class should *only* need to refer to the functions below this line.
// ====================================================================================
	// setupView sets up everything view-specific. The argument should be an object with the following keys:
	// 		"tileSize": size of each tile, in pixels 
	// 		"tilesWide": width of the world, in tiles
	// 		"tileHigh": width of the world, in tiles
	// 		"render": your function to render the world (the main function of your View)
	// 		"imagesToLoad": if you are using drawTileAt to draw image tiles in your renderer, you must provide a list of the image names here. These names are how you refer to them in with the drawTileAt function, and they should be the *same* as the name of an actual .png file stored in the same directory as the rest of the project files.

	setupView(viewInfo : {"tileSize"?: number, "tilesWide"?: number, "tilesHigh"?: number, "render"?: ()=>void, "imagesToLoad"?:Array<string>}) : void {
		if ("tileSize" in viewInfo) this.tileSize = viewInfo.tileSize;
		if ("tilesWide" in viewInfo) this.tilesWide = viewInfo.tilesWide;
		if ("tilesHigh" in viewInfo) this.tilesHigh = viewInfo.tilesHigh;

		this.canvas.width =  this.tilesWide*this.tileSize;
		this.canvas.height = this.tilesHigh*this.tileSize;

		if ("render" in viewInfo) this.render = viewInfo.render;

		if ("imagesToLoad" in viewInfo) {
			this.waitingForImages = true;
			this.loadImages(viewInfo.imagesToLoad);
		}
	}

	// setupController registers the possible event handlers.
	// The argument should be an object with keys corresponding to:
	// - "start" for your game-starting code
	// - one for each of the keycodes (https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code) you want to use; for example, the keycode for the "1" key is "Digit1" and the keycode for the "a" key is "KeyA".
	
	setupController(controllerInfo: {[index: string]: ()=>void;}) : void {
		this.listeners = controllerInfo;
	}

	// startGame will wait until the images are all loaded, then run your registered "start" function and your renderer.
	startGame(): void {
		// If it's still waiting on images to load, wait and try again 100ms later. 
		if (this.waitingForImages) {
			setTimeout(() => this.startGame(), 100);
		}
		else {
			this.listeners.start();
			this.render();
		}
	}

	// Write text into the textBox element. Because it is done with "innerText", you can use html elements (such as <br> for a linebreak) in it, if you want.
	writeText(text: string) : void {
		this.textBox.innerText = text;
	}

	// Fill the tile at this x, y location with the given color. 
	// Remember that x and y have their origin at the top left, so (0,0) is the top-left-most tile, (0,1) is the next one down, etc.
	// The color can be any string that can be parsed as a CSS color value. For example:
	// a hex string: "11eaea"
	// an RGB specification "rgb(17, 234, 234)"
	// an HSLA specification "hsla(180deg, 86%, 49%, 0.5)"
	fillTile(x : number, y : number, color : string) : void {
		this.ctx.fillStyle = color;
		this.ctx.fillRect(x*this.tileSize, y*this.tileSize, this.tileSize, this.tileSize);
	}

	// At location x, y, draw the image with this filename (without ".png").
	// Remember that if you want to use this, you need to load your images in your call to setupView.
	// png files can have transparent parts, so you may find it useful to layer them onto the same tile. If you imagine them as layers (like in Photoshop), you need to draw the lower layers before the upper layers.
	// Your tile images probably *should* be the same size as the tileSize that you set in setupView (it seems easier to think about?), but technically there's nothing enforcing this. 
	drawTileAt(x: number, y: number, imageName: string) : void {
		if (! (imageName in this.loadedImages)) {
			console.warn("Image was not loaded: " + imageName);
		}

		else {
			this.ctx.drawImage(this.loadedImages[imageName], x*this.tileSize, y*this.tileSize);
		}

	}

}

