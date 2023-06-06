import Gameboard from './gameboard';
import { Player, ComputerPlayer } from './player';
import Render from './render';
import { Coordinates } from './types';

const Game = (() => {
	const computerBoard = new Gameboard('computer');
	const playerBoard = new Gameboard('human');
	const humanPlayer = new Player(computerBoard, playerBoard);
	const computerPlayer = new ComputerPlayer(playerBoard, computerBoard);

	const checkWinner = (board: Gameboard) => {
		if (board.areShipsSunk()) {
			Render.win(board);
		}
	};

	const placeShip = (x: Coordinates, y: Coordinates) => {
		humanPlayer.placeShip(x, y);
	};

	const computerAttack = () => {
		let computerPlay = computerPlayer.attack();
		while (computerPlay === 'already attacked') {
			computerPlay = computerPlayer.attack();
		}
		checkWinner(playerBoard);
	};

	const humanAttack = (x: Coordinates, y: Coordinates) => {
		if (humanPlayer.getShipFleet().length !== 0) return;
		if (humanPlayer.attack(x, y) === 'already attacked') return;
		checkWinner(computerBoard);
		computerAttack();
	};

	const init = () => {
		// RENDER
		Render.renderBoards();
		Render.addEventListener(placeShip, Render.humanBoard);
		Render.addEventListener(humanAttack, Render.computerBoard);

		// SUBSCRIBERS
		playerBoard.subscribe('placeShip', Render.renderShip);
		computerBoard.subscribe('receiveAttack', Render.renderAttack);
		playerBoard.subscribe('receiveAttack', Render.renderAttack);

		// COMPUTER PLACE SHIPS
		while (computerPlayer.getShipFleet().length !== 0) {
			computerPlayer.placeShip();
		}
	};

	return { init };
})();

export default Game;
