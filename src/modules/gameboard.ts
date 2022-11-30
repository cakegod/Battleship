import Ship from './ship';
import { Coordinates, Direction } from './types';

export default class Gameboard {
	#board: Ship[][] | ''[][] | 'x'[][] = Array(10)
		.fill('')
		.map((_) => Array(10).fill(''));
	#placedShips: Ship[] = [];
	#observers: { [key: string]: Function[] } = {};
	player: 'computer' | 'human';
	constructor(player: 'computer' | 'human') {
		this.player = player;
	}

	subscribe(topic: keyof Gameboard, subscriber: Function) {
		if (!this.#observers[topic]) {
			this.#observers[topic] = [];
		}

		this.#observers[topic].push(subscriber);
	}

	unsubscribe(topic: keyof Gameboard, subscriber: Function) {
		this.#observers[topic] = this.#observers[topic].filter(func => func !== subscriber)
	}

	notify(
		topic: string,
		x: Coordinates,
		y: Coordinates,
		type?: 'miss' | 'hit',
		player?: 'computer' | 'human',
	) {
		if (!this.#observers[topic]) return;
		this.#observers[topic].forEach((sub) => sub(x, y, type, player));
	}

	placeShip(ship: Ship, direction: Direction, x: Coordinates, y: Coordinates) {
		const length = ship.getLength();

		function canFit() {
			if (direction === 'horizontal') {
				return x <= 10 - length;
			} else if (direction === 'vertical') {
				return y <= 10 - length;
			}
		}

		function isPlaceEmpty(board: Ship[][] | string[][]) {
			if (direction === 'horizontal') {
				for (let i = x; i <= x + length - 1; i += 1) {
					if (board[i][y] !== '') {
						return false;
					}
				}
			} else if (direction === 'vertical') {
				for (let i = y; i <= y + length - 1; i += 1) {
					if (board[x][i] !== '') {
						return false;
					}
				}
			}
			return true;
		}

		// Checks
		if (!canFit()) {
			return 'does not fit board';
		}
		if (!isPlaceEmpty(this.#board)) {
			return 'place is occupied';
		}

		// Places ships
		this.#placedShips.push(ship);

		if (direction === 'horizontal') {
			for (let i = x; i <= x + length - 1; i += 1) {
				this.#board[i][y] = ship;
				this.#observers['placeShip'] && this.notify('placeShip', i, y);
			}
		} else if (direction === 'vertical') {
			for (let i = y; i <= y + length - 1; i += 1) {
				this.#board[x][i] = ship;
				this.#observers['placeShip'] && this.notify('placeShip', x, i);
			}
		}

		return 'has been placed';
	}

	receiveAttack(x: Coordinates, y: Coordinates) {
		const position = this.#board[x][y];

		if (position === 'x') {
			return 'already attacked';
		} else if (position === '') {
			this.#board[x][y] = 'x';
			this.notify('receiveAttack', x, y, 'miss', this.player);
			return 'miss';
		}

		position.hit();
		this.#board[x][y] = 'x';
		this.notify('receiveAttack', x, y, 'hit', this.player);
		return 'hit';
	}

	areShipsSunk() {
		return this.#placedShips.every((ship) => ship.isSunk());
	}
}
