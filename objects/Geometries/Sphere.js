
class Sphere extends Geometry {
	// Vector center;
	// number radius;
	constructor(center, radius) {
		super();
		this.center = center;
		this.radius = radius;
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
		console.log(discriminant);
		// TODO Finish the method here, determining the actual distance.
		// TODO Also add color handling.
		if (discriminant > 0) { // Two solutions:
			return new Contact(true, 3, new Color(255, 255, 0));
		} else if (discriminant == 0) { // One solution:

		} else { // No solutions:
			return new Contact(false);
		}
	}
}
