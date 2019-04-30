class Color {
	// number red; // Redness, from 0-255
	// number green; // Greenness, from 0-255
	// number blue; // Blueness, from 0-255
	// number alpha; // Transparency.  0 is fully transparent, and 255 is fully opaque.
	constructor(red, green, blue, alpha) {
		if (red == undefined) {
			// Creates a blank color by default.
			// Fully transparent black
			this.red = 0;
			this.green = 0;
			this.blue = 0;
			this.alpha = 0;
		} else if (alpha == undefined) {
			this.red = red;
			this.green = green;
			this.blue = blue;
			this.alpha = 255;
		} else {
			this.red = red;
			this.green = green;
			this.blue = blue;
			this.alpha = alpha;
		}
	}
}

