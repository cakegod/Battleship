// eslint-disable-next-line max-classes-per-file
import Gameboard from './gameboard';
import Ship from './ship';
import { Coordinates, Direction } from './types';

class HumanPlayer {
	#enemyBoard: Gameboard;
	#playerBoard: Gameboard;
	shipFleet: Ship[];
	direction: Direction = 'horizontal';

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
		const hasAlreadyAttackCoordinate =
			this.#enemyBoard.receiveAttack(x, y) === 'already attacked';
		const isShipFleetEmpty = this.shipFleet.length === 0;
		return !hasAlreadyAttackCoordinate && !isShipFleetEmpty;
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
	getShipFleet() {
		return this.shipFleet;
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

	placeShip() {
		while (this.#player.getShipFleet().length !== 0) {
			this.#player.placeShip(
				ComputerPlayer.#randomCoordinates(),
				ComputerPlayer.#randomCoordinates(),
			);
		}
	}

	getShipFleet() {
		return this.#player.getShipFleet();
	}
}

export { HumanPlayer, ComputerPlayer };
