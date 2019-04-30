class Contact {
	// Color color;
	// number distance;  The distance away from the camera screen the hit occurred, in
	// boolean isHit;
	constructor(isHit, distance, color) {
		this.isHit = isHit;
		if (this.isHit) {
			this.distance = distance;
			this.color = color;
		}
	}

	// Contact otherContact;
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

