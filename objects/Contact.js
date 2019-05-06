class Contact {
	// Color color;
	// number distance;  The distance away from the camera screen the hit occurred, in numbers of vectors that were fired.
	// This should only be used to compare hits from the same vector.
	// boolean isHit;
	constructor(isHit, distance, color) {
		this.isHit = isHit;
		if (this.isHit && distance > 1) { // Hits must be outside of the camera.
			this.distance = distance;
			this.color = color;
		} else {
			this.isHit = false;
		}
	}

	// Contact otherContact;
	// Determines which hit, this or otherContact, is closer to the camera.
	// 
	// Returns: boolean
	isCloserThan(otherContact) {
		if (otherContact.isHit && !this.isHit) {
			return false;
		} else if (!otherContact.isHit && this.isHit) {
			return true;
		} else if (otherContact.isHit && this.isHit) {
			if (this.distance < otherContact.distance) {
				return true;
			} else {
				return false;
			}
		} else { // If both aren't a hit, this has no meaning.  So return false.
			return false;
		}
	}
}

