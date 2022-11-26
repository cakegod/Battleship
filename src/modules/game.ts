import Gameboard from './gameboard';
import { Player, ComputerPlayer } from './player';
import Render from './render';
import { Coordinates } from './types';

export default class Game {
	#computerBoard = new Gameboard('computer');
	#playerBoard = new Gameboard('human');
	#humanPlayer = new Player(this.#computerBoard, this.#playerBoard);
	#computerPlayer = new ComputerPlayer(this.#playerBoard, this.#computerBoard);
	#render = new Render();

	constructor() {
		// RENDER
		this.#render.renderBoards();
		this.#render.addPlaceShipListener(this.placeShip);
		this.#render.addAttackListener(this.humanAttack);

		// SUBSCRIBERS
		this.#playerBoard.subscribe('placeShip', this.#render.renderShip);
		this.#computerBoard.subscribe('receiveAttack', this.#render.renderAttack);
		this.#playerBoard.subscribe('receiveAttack', this.#render.renderAttack);

		// COMPUTER PLACE SHIPS
		while (this.#computerPlayer.shipFleet.length !== 0) {
			this.#computerPlayer.placeShip();
		}
	}

	checkWinner(board: Gameboard) {
		board.areShipsSunk();
		this.#render.win(board)
		
	}

	placeShip = (x: Coordinates, y: Coordinates) => {
		this.#humanPlayer.placeShip(x, y);
	};

	humanAttack = (x: Coordinates, y: Coordinates) => {
		if (this.#humanPlayer.attack(x, y) === 'already attacked') return;
		this.checkWinner(this.#computerBoard);
		this.computerAttack();
	};

	computerAttack = () => {
		let computerPlay = this.#computerPlayer.attack();
		while (computerPlay === 'already attacked') {
			computerPlay = this.#computerPlayer.attack();
		}
		this.checkWinner(this.#playerBoard);
	};
}
