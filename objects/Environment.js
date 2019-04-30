class Environment {
	// Camera camera;
	// Geometry[] geometries;
	constructor(camera) {
		this.camera = camera;
		this.geometries = [];
	}

	// CanvasRenderingContext2D context;
	// Returns: Color[][]
	fireRays(context) {
		let xRes = this.camera.screen.xRes;
		let yRes = this.camera.screen.yRes;
		// TODO Maybe don't worry about the image data until another place?
		//var imageData = context.createImageData(this.camera.screen.xRes, this.camera.screen.yRes);

		let rays = this.camera.getRays();
		var colorArray = []; // Color[][] colorArray
		for (var x=0; x<xRes; x++) {
			colorArray.push([]);
			for (var y=0; y<yRes; y++) {
				var closestHit = new Contact(false);
				for (var i=0; i<this.geometries.length; i++) {
					var newHit = this.geometries[i].evaluateHit(rays[x][y]);
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

