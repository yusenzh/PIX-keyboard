import { Engine } from "./engine";
let engine : Engine = new Engine();

// This function will be run when the page loads. It will handle making new elements, attaching event listeners, etc. 
// We are going to build a calculator 
window.onload = () => {
    let canvas : HTMLCanvasElement = document.getElementById("gameCanvas") as HTMLCanvasElement ;
    
    let draw : CanvasRenderingContext2D = canvas.getContext("2d");

	let drawingCurrentPicAtX : number = 0;
	let drawingCurrentPicAtY : number = 0;

    // Start loading images so engine.loadedImages["a"] is defined
    engine.setupView({ 
		tileSize: 9, 
		tilesWide: 85, 
		tilesHigh: 85, 
		imagesToLoad: ["a", "n", "e", "l", "i", "o", "r", "s", "h"], 
		render: () => {} 
	})

	document.addEventListener("keydown", (event: KeyboardEvent) => { 
		let img: HTMLImageElement;
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
		const drawNow = () => draw.drawImage(img, drawingCurrentPicAtX, drawingCurrentPicAtY, 250, 250);
		if (img.complete && img.naturalWidth > 0) {
			drawNow();
		} else {
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
	document.addEventListener("keydown", (event: KeyboardEvent) => { 
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
			} else {
				drawingCurrentPicAtX -= 250;
			}
			draw.clearRect(drawingCurrentPicAtX, drawingCurrentPicAtY, 250, 250);
		}
	});
}
