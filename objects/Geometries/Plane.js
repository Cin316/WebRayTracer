class Plane extends Geometry {

	// Vector normalVector;
	// Vector pointInPlane;

	// Three points which are in the Plane:
	// Vector p1;
	// Vector p2;
	// Vector p3;
	// obj can be either a Color or a ColorFunction.
	constructor(p1, p2, p3, obj) {
		super(obj);
		this.normalVector = p1.sub(p2).cross(p3.sub(p2));
		this.pointInPlane = p1;
	}

	// Vector ray; // The direction the ray is travelling.
	// Vector source; // The point from which the ray comes.  Usually the position of the camera.
	// Evaluate a hit using the given ray.
	// Returns: Contact
	evaluateHit(ray, source) {
		let numerator = this.normalVector.dot(this.pointInPlane) - this.normalVector.dot(source);
		let denominator = this.normalVector.dot(ray);
		let t = numerator/denominator;
		if (denominator != 0) {
			let hitLocation = source.add(ray.scalarMult(t));
			let color = this.colorFunction(hitLocation, this);
			let hit = new Contact(true, t, color);
			return hit;
		} else {
			return new Contact(false);
		}
	}

}

