// Represents an empty Geometry object.  Subclass it to display an object.
class Geometry {
	
	// A ColorFunction takes a Vector position (and a reference to this) and returns the Color of a collision with that position.
	// colorFunction: function(Vector, Sphere) -> Color

	// obj can be either a Color or a ColorFunction.
	constructor(obj) {
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
		return new Contact(false);
	}
}

