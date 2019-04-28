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
		let pixelWidth = xVec.scalarMult(-1/this.screen.xRes);
		let pixelHeight = yVec.scalarMult(-1/this.screen.yRes);
		let centerOffset = pixelWidth.add(pixelHeight).scalarMult(1/2); // An additional offset vector to move the vectors from the top-right corners of the pixels to the middle of the pixels.
		let upperLeftCorner = this.direction.add(xVec.scalarMult(1/2)).add(yVec.scalarMult(1/2));
		var array = [];
		for (var x=0; x<this.screen.xRes; x++) {
			array.push([]);
			for (var y=0; y<this.screen.yRes; y++) {
				let endpoint = upperLeftCorner.add(pixelWidth.scalarMult(x)).add(pixelHeight.scalarMult(y)).add(centerOffset);
				array[x].push(endpoint);
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

class Environment {
	// Camera camera;
	// Geometry[] geometries;
	constructor(camera) {
		this.camera = camera;
		this.geometries = [];
	}

	// CanvasRenderingContext2D context;
	fireRays(context) {
		let xRes = this.camera.screen.xRes;
		let yRes = this.camera.screen.yRes;
		// TODO Maybe don't worry about the image data until another place?
		var imageData = context.createImageData(this.camera.screen.xRes, this.camera.screen.yRes);

		let rays = this.camera.getRays();
		var colorArray = [];
		for (int x=0; x<xRes; x++) {
			colorArray.push([]);
			for (int y=0; y<yRes; y++) {
				var closestHit = new Contact(false);
				for (int i=0; i<this.geometries.length; i++) {
					var newHit = this.geometries[i].evaluateHit(rays[x][y]);
					if (newHit.isCloserThan(closestHit)) {
						closestHit = newHit;
					}
				}
				if (closestHit.isHit) {
					colorArray[x].push(closestHit.color);
				} else {
					// colorArray[x].push(blankColor);
				}
			}
		}

	}
}

// Represents an empty Geometry object.  Subclass it to display an object.
class Geometry {
	// Vector ray;
	// Evaluate a hit using the fiven ray.
	// Returns: Contact
	evaluateHit(ray) {
		return new Contact(false);
	}
}

class Contact {
	// Color color;
	// number distance;  The distance away from the camera screen the hit occurred, in
	// boolean isHit;
	constructor(isHit, distance, color) {
		this.isHit = isHit;
		if (this.isHit) {
			this.distance = distance;
			this.color = color;
		}
	}

	// Contact otherContact;
	//
	// Returns: boolean
	isCloserThan(otherContact) {
		if (otherContact.isHit && !this.isHit) {
			return false;
		} else if (!otherContact.isHit && this.isHit) {
			return true;
		} else if (otherContact.isHit && this.isHit) {
			if (this.distance < otherContact.distance) {
				return true;
			} else {
				return false;
			}
		} else { // If both aren't a hit, this has no meaning.  So return false.
			return false;
		}
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

	var position = new Vector(1, 0, 0);
	var direction = new Vector(0, 10, 0);
	var screen = new Screen(100, 50, 10, 5);

	var cam = new Camera(position, direction, screen);

	var vectors = cam.getRays();
	console.log(vectors);

	
}

window.onload = main;

