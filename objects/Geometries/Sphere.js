class Sphere extends Geometry {

	// A ColorFunction takes a Vector position (and a reference to this) and returns the Color of a collision with that position.
	// colorFunction: function(Vector, Sphere) -> Color

	// Vector center;
	// number radius;
	// obj can be either a Color or a ColorFunction.
	constructor(center, radius, obj) {
		super();
		this.center = center;
		this.radius = radius;
		if (typeof obj == "undefined") { // obj is blank so default to red
			this.colorFunction = function(point, that) {
				return new Color(255, 0, 0);
			};
		} else if (typeof obj == "object") { //obj is a Color so display that color everywhere.
			this.colorFunction = function(point, that) {
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

			let color1 = this.colorFunction(hit1Location, this);
			let color2 = this.colorFunction(hit2Location, this);

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
			let color = this.colorFunction(hitLocation, this);
			let hit = new Contact(true, t, color);

			return hit;
		} else { // No solutions:
			return new Contact(false);
		}
	}

	// Vector point;
	// Converts the specified point to a polar coordinate based on this sphere.
	// The azimuthal angle is the angle in the xy-plane counterclockwise from the positive x-axis.
	// The angle is given in radians.
	// This will always be positive, between 0 and 2*pi;
	// Returns: number
	pointToAzimuthalAngle(point) {
		let relativePoint = point.sub(this.center);
		var angleInRadians = Math.atan(relativePoint.y/relativePoint.x);
		if (angleInRadians < 0) {
			angleInRadians = Math.PI*2 + angleInRadians;
		}

		return angleInRadians;
	}

	// Vector point;
	// Converts the specified point to a polar coordinate based on this sphere.
	// The polar angle is the angle down from the positive z-axis.
	// The angle is given in radians.
	// Returns: number
	pointToPolarAngle(point) {
		let relativePoint = point.sub(this.center);
		let angleInRadians = Math.acos(relativePoint.z/this.radius);

		return angleInRadians;

	}

}

