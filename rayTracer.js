
function main() {
	var canvas = document.getElementById("canvas");

	canvas.width = 700;
	canvas.height = 400;

	var ctx = canvas.getContext("2d");

	ctx.fillStyle = "red";
	ctx.fillRect(0, 0, 700, 400);

	var position = new Vector(1, 0, 0);
	var direction = new Vector(0, 10, 0);
	var screen = new Screen(100, 50, 10, 5);

	var cam = new Camera(position, direction, screen);

	var vectors = cam.getRays();
	console.log(vectors);

	var environment = new Environment(cam);
	console.log(environment.fireRays());

	
}

window.onload = main;

