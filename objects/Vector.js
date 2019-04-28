class Vector {
	// number x;
	// number y;
	// number z;
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	// Returns the sum of this vector with v.
	// Returns: Vector
	add(v) {
		return new Vector(this.x+v.x, this.y+v.y, this.z+v.z);
	}

	// Returns this vector minus v.
	// Returns: Vector
	sub(v) {
		return new Vector(this.x-v.x, this.y-v.y, this.z-v.z);

	}

	// Returns the norm of this vector.
	// Returns: number
	norm() {
		return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
	}

	// number k;
	// Multiplies this vector by a scalar k.
	// Returns: Vector
	scalarMult(k) {
		return new Vector(k*this.x, k*this.y, k*this.z);
	}

	// Returns the unit vector in the direction of this vector.
	// Returns: Vector
	unitVector() {
		return this.scalarMult(1/this.norm());
	}

	// Vector v;
	// Returns the dot product of this vector with v.
	// Returns: number
	dot(v) {
		return this.x*v.x + this.y*v.y + this.z*v.z;
	}

	// Vector v;
	// Returns the cross product of this vector with v.
	// Returns: Vector
	cross(v) {
		return new Vector(this.y*v.z - this.z*v.y, this.z*v.x - this.x*v.z, this.x*v.y - this.y*v.x);
	}
}

