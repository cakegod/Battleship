import Gameboard from './gameboard';
import Ship from './ship';
import { Coordinates } from './types';

class Player {
	#enemyBoard: Gameboard;
	#playerBoard: Gameboard;
	shipFleet: Ship[];
	direction: 'horizontal' = 'horizontal';

	constructor(enemyBoard: Gameboard, playerBoard: Gameboard) {
		this.#enemyBoard = enemyBoard;
		this.#playerBoard = playerBoard;
		this.shipFleet = [
			new Ship('carrier', 5),
			new Ship('battleship', 4),
			new Ship('destroyer', 3),
			new Ship('submarine', 3),
			new Ship('patrol boat', 2),
		];
	}
	attack(x: Coordinates, y: Coordinates) {
		return this.#enemyBoard.receiveAttack(x, y);
	}

	placeShip(x: Coordinates, y: Coordinates) {
		if (this.shipFleet.length === 0) return 'no more ships';
		const placementResult = this.#playerBoard.placeShip(
			this.shipFleet[0],
			this.direction,
			x,
			y,
		);
		if (placementResult.success) {
			this.shipFleet.shift();

			return 'placed';
		}

		return 'cannot place ship';
	}
}

class ComputerPlayer extends Player {
	constructor(enemyBoard: Gameboard, playerBoard: Gameboard) {
		super(enemyBoard, playerBoard);
	}

	#randomCoordinates() {
		return Math.floor(Math.random() * 10) as Coordinates;
	}

	attack() {
		return super.attack(this.#randomCoordinates(), this.#randomCoordinates());
	}

	placeShip() {
		return super.placeShip(
			this.#randomCoordinates(),
			this.#randomCoordinates(),
		);
	}
}

export { Player, ComputerPlayer };
