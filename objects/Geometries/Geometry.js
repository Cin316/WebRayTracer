// Represents an empty Geometry object.  Subclass it to display an object.
class Geometry {
	// Vector ray;
	// Evaluate a hit using the fiven ray.
	// Returns: Contact
	evaluateHit(ray) {
		return new Contact(false);
	}
}

