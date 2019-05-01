class Environment {
	// Camera camera;
	// Geometry[] geometries;
	constructor(camera) {
		this.camera = camera;
		this.geometries = [];
	}

	// Fires the rays from the camera and makes an array of colored pixels based on where they hit.
	// Returns: Color[][]
	fireRays() {
		let xRes = this.camera.screen.xRes;
		let yRes = this.camera.screen.yRes;

		let rays = this.camera.getRays();

		var colorArray = []; // Color[][] colorArray
		for (var x=0; x<xRes; x++) {
			colorArray.push([]);
			for (var y=0; y<yRes; y++) {
				// Find the closest hit out of all of the geometries and take that as the color for the pixel.
				var closestHit = new Contact(false);
				for (var i=0; i<this.geometries.length; i++) {
					var newHit = this.geometries[i].evaluateHit(rays[x][y], this.camera.position);
					if (newHit.isCloserThan(closestHit)) {
						closestHit = newHit;
					}
				}
				if (closestHit.isHit) {
					colorArray[x].push(closestHit.color);
				} else {
					colorArray[x].push(new Color());
				}
			}
		}

		return colorArray;

	}
}

