
class Plane extends Geometry {

	// A ColorFunction takes a Vector position (and a reference to this) and returns the Color of a collision with that position.
	// colorFunction: function(Vector, Sphere) -> Color

	// Vector normalVector;
	// Vector pointInPlane;
	// obj can be either a Color or a ColorFunction.
	constructor(p1, p2, p3, obj) {
		super();
		this.normalVector = p1.sub(p2).cross(p3.sub(p2));
		this.pointInPlane = p1;
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


