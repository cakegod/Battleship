// eslint-disable-next-line max-classes-per-file
import Gameboard from './gameboard';
import Ship from './ship';
import { Coordinates, Direction } from './types';

class ShipFleet {
	fleet = [
		new Ship('carrier', 5),
		new Ship('battleship', 4),
		new Ship('destroyer', 3),
		new Ship('submarine', 3),
		new Ship('patrol boat', 2),
	];

	isShipFleetEmpty() {
		return this.fleet.length === 0;
	}

	takeOneShip() {
		if (this.isShipFleetEmpty()) {
			return false;
		}

		this.fleet.shift();
		return this.fleet[0];
	}
}

class HumanPlayer {
	#enemyBoard: Gameboard;
	#playerBoard: Gameboard;
	shipFleet: ShipFleet;
	direction: Direction = 'horizontal';

	constructor(enemyBoard: Gameboard, playerBoard: Gameboard) {
		this.#enemyBoard = enemyBoard;
		this.#playerBoard = playerBoard;
		this.shipFleet = new ShipFleet();
	}

	attack(x: Coordinates, y: Coordinates) {
		const hasAlreadyAttackCoordinate =
			this.#enemyBoard.receiveAttack(x, y) === 'already attacked';
		const isShipFleetEmpty = this.shipFleet.isShipFleetEmpty();

		return !hasAlreadyAttackCoordinate && !isShipFleetEmpty;
	}

	placeShip(x: Coordinates, y: Coordinates) {
		const ship = this.shipFleet.takeOneShip();
		if (!ship) return 'no more ships';

		const placementResult = this.#playerBoard.placeShip(
			ship,
			this.direction,
			x,
			y,
		);

		if (placementResult.success) {
			return 'placed';
		}

		return 'cannot place ship';
	}
}

class ComputerPlayer {
	static #randomCoordinates() {
		return Math.floor(Math.random() * 10) as Coordinates;
	}

	#player: HumanPlayer;

	constructor(enemyBoard: Gameboard, playerBoard: Gameboard) {
		this.#player = new HumanPlayer(enemyBoard, playerBoard);
	}

	attack() {
		let computerPlay = this.#player.attack(
			ComputerPlayer.#randomCoordinates(),
			ComputerPlayer.#randomCoordinates(),
		);
		while (!computerPlay) {
			computerPlay = this.#player.attack(
				ComputerPlayer.#randomCoordinates(),
				ComputerPlayer.#randomCoordinates(),
			);
		}
		return computerPlay;
	}

	placeAllShips() {
		while (!this.#player.shipFleet.isShipFleetEmpty()) {
			this.#player.placeShip(
				ComputerPlayer.#randomCoordinates(),
				ComputerPlayer.#randomCoordinates(),
			);
		}
	}
}

export { HumanPlayer, ComputerPlayer };
