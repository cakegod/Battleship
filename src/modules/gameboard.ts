import { PubSub } from './pubSub';
import Ship from './ship';
import {
	Board,
	Coordinates,
	Direction,
	Player,
	Subscriber,
	ValidAttack,
} from './types';

export default class Gameboard {
	#board: Board = Array(10)
		.fill('')
		.map(() => Array(10).fill(''));
	#placedShips: Ship[] = [];
	player: Player;

	constructor(player: Player) {
		this.player = player;
	}
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
			PubSub.hasSubscriber('placeShip') &&
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
		board: Board,
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

		const notifyReceiveAttack = (type: ValidAttack) =>
			PubSub.notify('receiveAttack', {
				x,
				y,
				type,
				player: this.player,
			});

		const markBoard = () => (this.#board[x][y] = 'x');

		switch (position) {
			case 'x':
				return 'already attacked';
			case '':
				markBoard();
				notifyReceiveAttack('miss');
				return 'miss';
			default:
				position.takeHit();
				markBoard();
				notifyReceiveAttack('hit');
				return 'hit';
		}
	}

	areShipsSunk() {
		return this.#placedShips.every((ship) => ship.isSunken());
	}
}
