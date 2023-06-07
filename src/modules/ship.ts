import { ShipLength } from './types';

export default class Ship {
	#name: string;
	#length: ShipLength;
	#health: 0 | 1 | ShipLength;

	constructor(name: string, length: ShipLength) {
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
