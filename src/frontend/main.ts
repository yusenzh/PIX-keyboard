// This function will be run when the page loads. It will handle making new elements, attaching event listeners, etc. 

window.onload = () => {
	let canvas : HTMLCanvasElement = document.getElementById("gameCanvas") as HTMLCanvasElement ;
	
	let draw : CanvasRenderingContext2D = canvas.getContext("2d");

	// because this function is defined here (inside the window.onload function), it has access to the canvas and draw variables.
	let newFrameWithRectangle = (rectangleSize: number, rectangleColor: string) : void => {

		// empty the screen
		draw.clearRect(0,0, canvas.width, canvas.height);

		// set the color
		draw.fillStyle = rectangleColor;

		// draw a rectangle centered on the canvas
		draw.fillRect((canvas.width - rectangleSize)/2,(canvas.height - rectangleSize)/2,rectangleSize,rectangleSize);
	}

	document.addEventListener("keydown", (event: KeyboardEvent) => { 
		if (event.code == "Digit1") {
			console.log("1!");
			newFrameWithRectangle(10, "#7400b8");
		}
		else if (event.code == "Digit2") {
			console.log("2!");
			newFrameWithRectangle(20, "#5390d9");
		}
		else if (event.code == "Digit3") {
			console.log("3!");
			newFrameWithRectangle(30, "#48bfe3");
		}
		else if (event.code == "Digit4") {
			console.log("4!");
			newFrameWithRectangle(40, "#64dfdf");
		}
		else if (event.code == "Digit5") {
			console.log("5!");
			newFrameWithRectangle(50, "#80ffdb");
		}
	});
}

