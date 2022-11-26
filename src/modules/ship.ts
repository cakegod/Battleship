export default class Ship {
	name: string;
	#length: number;
	#health: number;
	constructor(name: string, length: number) {
		this.name = name;
		this.#length = length;
		this.#health = length;
	}

	hit() {
		if (this.#length !== 0) {
			this.#health--;
		}
	}

	isSunk() {
		if (this.#health === 0) {
			return true;
		}
		return false;
	}

	getLength() {
		return this.#length;
	}
}
