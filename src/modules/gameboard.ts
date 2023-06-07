import { PubSub } from './PubSub';
import Render from './render';
import Ship from './ship';
import {
	Coordinates,
	Direction,
	Player,
	Subscriber,
	ValidAttack,
} from './types';

export default class Gameboard {
	#board: Ship[][] | ''[][] | 'x'[][] = Array(10)
		.fill('')
		.map(() => Array(10).fill(''));
	#placedShips: Ship[] = [];
	#observers: {
		[key: string]: Subscriber[];
	} = {};
	player: Player;

	constructor(player: Player) {
		this.player = player;
	}

	// notify(
	// 	topic: keyof Gameboard,
	// 	{
	// 		x,
	// 		y,
	// 		type = 'hit',
	// 		player = this.player,
	// 	}: {
	// 		x: Coordinates;
	// 		y: Coordinates;
	// 		type?: ValidAttack;
	// 		player?: Player;
	// 	},
	// ) {
	// 	if (!this.#observers[topic]) return;
	// 	this.#observers[topic].forEach((sub) => sub({ x, y, type, player }));
	// }

	placeShip(ship: Ship, direction: Direction, x: Coordinates, y: Coordinates) {
		const shipLength = ship.getLength();

		// Check if the ship can fit on the gameboard at the specified position
		if (!Gameboard.#canFitOnBoard(direction, x, y, shipLength)) {
			return { success: false, error: 'does not fit board' };
		}

		// Check if the positions on the gameboard are empty
		if (
			!Gameboard.#arePositionsEmpty(direction, x, y, shipLength, this.#board)
		) {
			return { success: false, error: 'place is occupied' };
		}

		// Place the ship on the gameboard and notify subscribed observers
		this.#placedShips.push(ship);
		for (let i = 0; i < shipLength; i += 1) {
			const row = (direction === 'horizontal' ? x + i : x) as Coordinates;
			const col = (direction === 'horizontal' ? y : y + i) as Coordinates;
			this.#board[row][col] = ship;
			this.#observers.placeShip &&
				PubSub.notify('placeShip', {
					x: row,
					y: row,
				});
		}

		return { success: true };
	}

	static #canFitOnBoard(
		direction: Direction,
		x: Coordinates,
		y: Coordinates,
		shipLength: number,
	) {
		return (
			(direction === 'horizontal' && x <= 10 - shipLength) ||
			(direction === 'vertical' && y <= 10 - shipLength)
		);
	}

	static #arePositionsEmpty(
		direction: Direction,
		x: Coordinates,
		y: Coordinates,
		shipLength: number,
		board: Ship[][] | ''[][] | 'x'[][],
	) {
		// Loop through each position on the gameboard where the ship will be placed
		for (let i = 0; i < shipLength; i += 1) {
			// Calculate the row and column of the current position
			const row = direction === 'horizontal' ? x + i : x;
			const col = direction === 'horizontal' ? y : y + i;

			// Check if the position is empty
			if (board[row][col] !== '') {
				return false;
			}
		}

		return true;
	}

	receiveAttack(x: Coordinates, y: Coordinates) {
		const position = this.#board[x][y];

		switch (position) {
			case 'x':
				return 'already attacked';
			case '':
				this.#board[x][y] = 'x';
				PubSub.notify('receiveAttack', {
					x,
					y,
					type: 'miss',
					player: this.player,
				});
				return 'miss';
			default:
				position.takeHit();
				this.#board[x][y] = 'x';
				PubSub.notify('receiveAttack', {
					x,
					y,
					type: 'hit',
					player: this.player,
				});
				return 'hit';
		}
	}

	areShipsSunk() {
		return this.#placedShips.every((ship) => ship.isSunken());
	}
}
