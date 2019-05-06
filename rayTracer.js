
function main() {
	var canvas = document.getElementById("canvas");

	var ctx = canvas.getContext("2d");

	// BEGIN Blur fix
	const width = 330;
	const height = 170;
	
	const scale = 4;
	
	const pixelRatio = window.devicePixelRatio || 1;

	canvas.width = width * pixelRatio;
	canvas.height = height * pixelRatio;

	canvas.style.width = `${width * scale}px`;
	canvas.style.height = `${height * scale}px`;

	//ctx.scale(pixelRatio, pixelRatio);

	canvas.style.imageRendering = `pixelated`;

	// END Blur fix

	ctx.fillStyle = "red";
	ctx.fillRect(0, 0, 330, 170);

	ctx.strokeStyle = "blue";
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(30, 30);
	ctx.stroke();

	var position = new Vector(1, 0, 0);
	var direction = new Vector(0, 1, 0);
	var screen = new Screen(1, 0.5, 320, 160);

	var cam = new Camera(position, direction, screen);

	var vectors = cam.getRays();

	var environment = new Environment(cam);

	var sphere = new Sphere(new Vector(1, 10, 0), 2, new Color(255, 100, 0));
	environment.geometries.push(sphere);
	var sphere2 = new Sphere(new Vector(-1.0, 10, 0), 2, function(point) { return new Color(200,0,0);});
	environment.geometries.push(sphere2);
	var sphere3 = new Sphere(new Vector(1.9, 5, 0), 0.25, new Color(0, 50, 150));
	environment.geometries.push(sphere3);
	var sphere4 = new Sphere(new Vector(40, 100, 20), 10, new Color(255, 0, 255));
	environment.geometries.push(sphere4);

	var colorArray = environment.fireRays();

	var imageData = convertColorArrToImageData(ctx, colorArray);
	console.log(imageData);

	ctx.putImageData(imageData, 5, 5);

	
}

window.onload = main;

