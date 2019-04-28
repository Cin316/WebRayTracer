class Camera {
	// Vector position;  // The position of the camera measured from the origin.
	// Vector direction;  // The direction the camera points.  The length of this determines the field of view.
	// Screen screen;  // The screen is centered at position+direction, perpindicular to direction.

	constructor(position, direction, screen) {
		this.position = position;
		this.direction = direction;
		this.screen = screen;
	}


	// Returns the vector that runs along the width of the camera screen in the 3D world.
	// Returns: Vector
	cameraXVec() { 
		let denom = Math.sqrt(this.direction.x*this.direction.x + this.direction.y*this.direction.y);
		return (new Vector(-this.direction.y/denom, this.direction.x/denom, 0)).scalarMult(this.screen.width);
	}
	// Returns the vector that runs along the height of the camera screen in the 3D world.
	// Returns: Vector
	cameraYVec() { 
		let xVec = this.cameraXVec();
		return this.direction.cross(xVec).unitVector().scalarMult(this.screen.height);
	}

	// Returns an array of vectors that reach from the position to the cetner of each pixel, so they can be fired.
	// Returns: Vector[]
	getRays() { 
		let xVec = this.cameraXVec();
		let yVec = this.cameraYVec();
		let pixelWidth = xVec.scalarMult(1/this.screen.xRes);
		let pixelHeight = yVec.scalarMult(1/this.screen.yRes);
		let centerOffset = pixelWidth.add(pixelHeight).scalarMult(1/2);
		let upperLeftCorner = this.direction.add(xVec.scalarMult(1/2)).add(yVec.scalarMult(1/2));
		var array = [];
		for (var x=0; x<this.screen.xRes; x++) {
			for (var y=0; y<this.screen.yRes; y++) {
				let endpoint = upperLeftCorner.add(pixelWidth.scalarMult(x)).add(pixelHeight.scalarMult(y)).add(centerOffset);
				array.push(endpoint);
			}
		}

		return array;
	}

}

class Screen {
	// number width;  // The number of units wide this screen is in the 3D world.
	// number height;  // The number of units high this screen is in the 3D world.
	// number xRes;  // The number of pixels wide this screen renders to in 2D.
	// number yRes;  // The number of pixels high this screen renders to in 2D.
	constructor(width, height, xRes, yRes) {
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

