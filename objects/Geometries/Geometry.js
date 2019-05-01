// Represents an empty Geometry object.  Subclass it to display an object.
class Geometry {
	// Vector ray; // The direction the ray is travelling.
	// Vector source; // The point from which the ray comes.  Usually the position of the camera.
	// Evaluate a hit using the given ray.
	// Returns: Contact
	evaluateHit(ray, source) {
		return new Contact(false);
	}
}

