import { Engine } from "./engine";
let engine : Engine = new Engine();

// This function will be run when the page loads. It will handle making new elements, attaching event listeners, etc. 
// We are going to build a calculator 
window.onload = () => {
	let canvas : HTMLCanvasElement = document.getElementById("gameCanvas") as HTMLCanvasElement ;
	
	let draw : CanvasRenderingContext2D = canvas.getContext("2d");



	document.addEventListener("keydown", (event: KeyboardEvent) => { 
		if (event.code == "Digit1") {
			console.log("1!");
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

