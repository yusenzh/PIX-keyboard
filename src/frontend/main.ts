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
    engine.setupView({ tileSize: 9, tilesWide: 85, tilesHigh: 85, imagesToLoad: ["a"], render: () => {} })

	document.addEventListener("keydown", (event: KeyboardEvent) => { 
        if (event.code == "Digit1") {
            console.log("1!");
            // Safely draw only after the image is available
            const img = engine.loadedImages["a"];
            if (!img) {
                console.warn("Image 'a' is not registered. Did setupView run?");
                return;
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
        }
		else if (event.code == "Digit2") {
			console.log("2!");
		}
		else if (event.code == "Digit3") {
			console.log("3!");
		}
		else if (event.code == "Digit4") {
			console.log("4!");
		}
		else if (event.code == "Digit5") {
			console.log("5!");
		}
		else if (event.code == "Digit6") {
			console.log("6!");
		}
		else if (event.code == "Digit7") {
			console.log("7!");
		}
		else if (event.code == "Digit8") {
			console.log("8!");
		}
		else if (event.code == "Digit9") {
			console.log("9!");
		}
	});
}
