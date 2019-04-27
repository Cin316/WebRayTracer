class Camera {
	// Vector position;  // The position of the camera measured from the origin.
	// Vector direction;  // The direction the camera points.  The length of this determines the field of view.
	// Screen screen;  // The screen is centered at position+direction, perpindicular to direction.
	constructor(position, direction, screen) {
		this.position = position;
		this.direction = direction;
		this.screen = screen;
	}


	// Add functions to fire vectors and draw an image here.

}

class Screen {
	// number width;  // The number of units wide this screen is in the 3D world.
	// number height;  // The number of units high this screen is in the 3D world.
	// number xRes;  // The number of pixels wide this screen renders to in 2D.
	// number yRes;  // The number of pixels high this screen renders to in 2D.
	constructor(width, hieght, xRes, yRes) {
		this.width = width;
		this.height = height;
		this.xRes = xRes;
		this.yRes = yRes;
	}
}

// Create an environment and structures that live in the environment and can return a color if a vector hits them.


function main() {
	var canvas = document.getElementById("canvas");

	canvas.width = 700;
	canvas.height = 400;

	var ctx = canvas.getContext("2d");

	ctx.fillStyle = "red";
	ctx.fillRect(0, 0, 700, 400);
}

window.onload = main;

