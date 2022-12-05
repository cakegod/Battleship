type Length = 2 | 3 | 4 | 5;

export default class Ship {
	#name: string;
	#length: Length;
	#health: 0 | 1 | Length;

	constructor(name: string, length: Length) {
		this.#name = name;
		this.#length = length;
		this.#health = length;
	}

	takeHit() {
		if (this.#health !== 0) {
			this.#health -= 1;
		}
	}

	isSunken() {
		if (this.#health === 0) {
			return true;
		}
		return false;
	}

	getLength() {
		return this.#length;
	}

	getName() {
		return this.#name;
	}
}
