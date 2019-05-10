
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

	window.rayTracerEnvironment = new Environment(cam);

	var sphere = new Sphere(new Vector(1, 10, 0), 2, new Color(255, 100, 0));
	window.rayTracerEnvironment.geometries.push(sphere);
	var sphere2 = new Sphere(new Vector(-1.3, 10, 0), 1.7, function(point, that) { return new Color(200,0,0);});
	window.rayTracerEnvironment.geometries.push(sphere2);
	var sphere3 = new Sphere(new Vector(1.9, 5, 1), 0.25, new Color(0, 50, 150));
	window.rayTracerEnvironment.geometries.push(sphere3);
	var sphere4 = new Sphere(new Vector(40, 100, 20), 10, new Color(255, 0, 255));
	window.rayTracerEnvironment.geometries.push(sphere4);
	var plane = new Plane(new Vector(0,0,-7), new Vector(0,1,-7), new Vector(1,0,-7), new Color(70, 40, 70));
	window.rayTracerEnvironment.geometries.push(plane);
	var triangle = new Triangle(new Vector(-4,20,1), new Vector(-3,5,-0.5), new Vector(1.5,5,-0.5), new Color(25, 194, 227));
	window.rayTracerEnvironment.geometries.push(triangle);

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
	window.rayTracerEnvironment.geometries.push(checkeredSphere);

	repaintCanvas();
}

function repaintCanvas() {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	var colorArray = window.rayTracerEnvironment.fireRays();
	var imageData = convertColorArrToImageData(ctx, colorArray);
	ctx.putImageData(imageData, 5, 5);
}

function onKeyDown(event) {
	let code = event.code;
	console.log("down: "+code);
	if (code == "KeyA") { // Move Left
		window.rayTracerEnvironment.camera.position.x-=0.1;
	}
	if (code == "KeyD") { // Move Right
		window.rayTracerEnvironment.camera.position.x+=0.1;
	}
	if (code == "KeyW") { // Move Forward
		window.rayTracerEnvironment.camera.position.y+=0.1;
	}
	if (code == "KeyS") { // Move Backward
		window.rayTracerEnvironment.camera.position.y-=0.1;
	}
	if (code == "KeyQ") { // Move Up
		window.rayTracerEnvironment.camera.position.z+=0.1;
	}
	if (code == "KeyZ") { // Move Down
		window.rayTracerEnvironment.camera.position.z-=0.1;
	}
	if (code == "KeyJ") { // Start animation
		window.sphereStart = 0;
		window.requestAnimationFrame(animateSphere);
	}
	repaintCanvas();
}
function onKeyUp(event) {
	let code = event.code;
	console.log("up: "+code);
}

function animateSphere(timestamp) {
	if (window.sphereStart == 0) window.sphereStart = timestamp;
	let smallSphere = window.rayTracerEnvironment.geometries[2];

	smallSphere.center.x = 1 + Math.cos((timestamp-window.sphereStart)/1000)*3;
	smallSphere.center.y = 10 + Math.sin((timestamp-window.sphereStart)/1000)*3;

	repaintCanvas();

	window.requestAnimationFrame(animateSphere);
}

document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", onKeyUp);
window.onload = main;

