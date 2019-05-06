class Sphere extends Geometry {

	// A ColorFunction takes a Vector position and returns the Color of a collision with that position.
	// colorFunction: function(Point) -> Color

	// Vector center;
	// number radius;
	// obj can be either a Color or a ColorFunction.
	constructor(center, radius, obj) {
		super();
		this.center = center;
		this.radius = radius;
		if (typeof obj == "undefined") { // obj is blank so default to red
			this.colorFunction = function(point) {
				return new Color(255, 0, 0);
			};
		} else if (typeof obj == "object") { //obj is a Color so display that color everywhere.
			this.colorFunction = function(point) {
				return obj;
			};
		} else { // Otherwise, obj is a ColorFunction.
			this.colorFunction = obj;
		}

			
	}

	// Vector ray; // The direction the ray is travelling.
	// Vector source; // The point from which the ray comes.  Usually the position of the camera.
	// Evaluate a hit using the given ray.
	// Returns: Contact
	evaluateHit(ray, source) {
		let w = this.center.sub(source);

		// We'll solve a quadratic equation with a,b,c as follows:
		let a = ray.dot(ray);
		let b = -2*(ray.dot(w));
		let c = w.dot(w) - this.radius*this.radius;

		// The number of solutions is determined by the discriminant.
		let discriminant = (b*b) - (4*a*c);
		if (discriminant > 0) { // Two solutions:
			let sqrtDisc = Math.sqrt(discriminant);
			let t1 = (-b + sqrtDisc)/(2*a);
			let t2 = (-b - sqrtDisc)/(2*a);

			let hit1Location = source.add(ray.scalarMult(t1));
			let hit2Location = source.add(ray.scalarMult(t2));

			let color1 = this.colorFunction(hit1Location);
			let color2 = this.colorFunction(hit2Location);

			let hit1 = new Contact(true, t1, color1);
			let hit2 = new Contact(true, t2, color2);

			// Return the closer of hit1 and hit2.
			if (hit1.isCloserThan(hit2)) {
				return hit1;
			} else {
				return hit2;
			}
		} else if (discriminant == 0) { // One solution:
			let t = -b/(2*a);
			let hitLocation = source.add(ray.scalarMult(t));
			let color = this.colorFunction(hitLocation);
			let hit = new Contact(true, t, color);

			return hit;
		} else { // No solutions:
			return new Contact(false);
		}
	}

}

