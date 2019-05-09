class Triangle extends Plane {

	// Three points which bound the Triangle:
	// Vector p1;
	// Vector p2;
	// Vector p3;
	// obj can be either a Color or a ColorFunction.
	constructor(p1, p2, p3, obj) {
		super(p1, p2, p3, obj);
		this.p1 = p1;
		this.p2 = p2;
		this.p3 = p3;
	}

	// Vector ray; // The direction the ray is travelling.
	// Vector source; // The point from which the ray comes.  Usually the position of the camera.
	// Evaluate a hit using the given ray.
	// Returns: Contact
	evaluateHit(ray, source) {
		let superHit = super.evaluateHit(ray, source);
		if (superHit.isHit) {
			let hitLocation = source.add(ray.scalarMult(superHit.distance));
			if (this.pointIsInThisTriangle(hitLocation)) {
				return superHit;
			} else {
				return new Contact(false);
			}
		} else {
			return superHit;
		}
	}

	// Vector point;
	// Returns: boolean
	pointIsInThisTriangle(point) {
		// Uses a change of basis to determine if the point is inside this triangle.
		// Explanation can be found here: http://blackpawn.com/texts/pointinpoly/
		let v0 = this.p3.sub(this.p1);
		let v1 = this.p2.sub(this.p1);
		let v2 = point.sub(this.p1);

		let dot00 = v0.dot(v0);
		let dot01 = v0.dot(v1);
		let dot02 = v0.dot(v2);
		let dot11 = v1.dot(v1);
		let dot12 = v1.dot(v2);

		let invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
		let u = (dot11 * dot02 - dot01 * dot12) * invDenom;
		let v = (dot00 * dot12 - dot01 * dot02) * invDenom;

		// Check if point is in triangle
		return (u >= 0) && (v >= 0) && (u + v < 1);
	}

}

