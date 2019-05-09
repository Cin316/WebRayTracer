
function main() {
	var canvas = document.getElementById("canvas");

	var ctx = canvas.getContext("2d");

	let cameraScreenResX = 20*16;
	let cameraScreenResY = 10*16;
	
	let scale = 4;

	// BEGIN Blur fix
	const width = cameraScreenResX + 10;
	const height = cameraScreenResY + 10;
	
	//const pixelRatio = window.devicePixelRatio || 1;
	const pixelRatio = 1;

	canvas.width = width * pixelRatio;
	canvas.height = height * pixelRatio;

	canvas.style.width = `${width * scale}px`;
	canvas.style.height = `${height * scale}px`;

	//ctx.scale(pixelRatio, pixelRatio);

	canvas.style.imageRendering = `pixelated`;

	// END Blur fix

	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, width, height);

	var position = new Vector(1, 0, 0);
	var direction = new Vector(0, 1, 0);
	var screen = new Screen(1, 0.5, cameraScreenResX, cameraScreenResY);

	var cam = new Camera(position, direction, screen);

	var environment = new Environment(cam);

	var sphere = new Sphere(new Vector(1, 10, 0), 2, new Color(255, 100, 0));
	environment.geometries.push(sphere);
	var sphere2 = new Sphere(new Vector(-1.3, 10, 0), 1.7, function(point, that) { return new Color(200,0,0);});
	environment.geometries.push(sphere2);
	var sphere3 = new Sphere(new Vector(1.9, 5, 0), 0.25, new Color(0, 50, 150));
	environment.geometries.push(sphere3);
	var sphere4 = new Sphere(new Vector(40, 100, 20), 10, new Color(255, 0, 255));
	environment.geometries.push(sphere4);
	var plane = new Plane(new Vector(0,0,-7), new Vector(0,1,-7), new Vector(1,0,-7), new Color(70, 40, 70));
	environment.geometries.push(plane);
	var triangle = new Triangle(new Vector(-4,20,1), new Vector(-3,5,-0.5), new Vector(1.5,5,-0.5), new Color(25, 194, 227));
	environment.geometries.push(triangle);

	var checkeredSphere = new Sphere(new Vector(25, 80, -5), 10, function(point, that) { 
		let azimuthalAngle = that.pointToAzimuthalAngle(point);
		let polarAngle = that.pointToPolarAngle(point);
		let sectionWidth = (Math.PI*2)/32;

		let sectionPos = azimuthalAngle % (sectionWidth*2);

		//console.log("azimuthalAngle: " + azimuthalAngle + " sectionWidth: " + sectionWidth + " sectionPos: " + sectionPos);
		if (sectionPos > sectionWidth) {
			return new Color(255, 255, 0);
		} else {
			return new Color(100, 255, 50);
		}
	});
	environment.geometries.push(checkeredSphere);

	var colorArray = environment.fireRays();

	var imageData = convertColorArrToImageData(ctx, colorArray);

	ctx.putImageData(imageData, 5, 5);

	
}

window.onload = main;

