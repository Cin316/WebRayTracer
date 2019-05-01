
function main() {
	var canvas = document.getElementById("canvas");

	var ctx = canvas.getContext("2d");

	// BEGIN Blur fix
	const width = 50;
	const height = 30;
	
	const scale = 32;
	
	const pixelRatio = window.devicePixelRatio || 1;

	canvas.width = width * pixelRatio;
	canvas.height = height * pixelRatio;

	canvas.style.width = `${width * scale}px`;
	canvas.style.height = `${height * scale}px`;

	//ctx.scale(pixelRatio, pixelRatio);

	canvas.style.imageRendering = `pixelated`;

	// END Blur fix

	ctx.fillStyle = "red";
	ctx.fillRect(0, 0, 50, 30);

	ctx.strokeStyle = "blue";
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(30, 30);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(20, 0);
	ctx.lineTo(50, 30);
	ctx.stroke();

	var position = new Vector(1, 0, 0);
	var direction = new Vector(0, 10, 0);
	var screen = new Screen(100, 50, 40, 20);

	var cam = new Camera(position, direction, screen);

	var vectors = cam.getRays();
	console.log(vectors);

	var environment = new Environment(cam);
	console.log(environment.fireRays());

	var colorArray = environment.fireRays();
	colorArray[0][0] = new Color(255, 255, 0);
	console.log(colorArray);

	var imageData = convertColorArrToImageData(ctx, colorArray);
	console.log(imageData);

	ctx.putImageData(imageData, 5, 5);

	
}

window.onload = main;

