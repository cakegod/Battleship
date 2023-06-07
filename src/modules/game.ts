import { PubSub } from './pubSub';
import Gameboard from './gameboard';
import { HumanPlayer, ComputerPlayer } from './player';
import Render from './render';
import { Coordinates, Player } from './types';

const Game = (() => {
	const computerBoard = new Gameboard('computer');
	const playerBoard = new Gameboard('human');
	const humanPlayer = new HumanPlayer(computerBoard, playerBoard);
	const computerPlayer = new ComputerPlayer(playerBoard, computerBoard);

	const checkWinner = (board: Gameboard, enemyPlayer: Player) => {
		if (board.areShipsSunk()) {
			Render.win(enemyPlayer);
		}
	};

	const placeShip = (x: Coordinates, y: Coordinates) => {
		humanPlayer.placeShip(x, y);
	};

	const computerAttack = () => {
		computerPlayer.attack();
		checkWinner(playerBoard, 'computer');
	};

	const humanAttack = (x: Coordinates, y: Coordinates) => {
		if (!humanPlayer.attack(x, y)) return;
		computerAttack();
		checkWinner(computerBoard, 'computer');
	};

	const init = () => {
		// RENDER
		Render.renderBoards();
		Render.addEventListener(placeShip, Render.humanBoard);
		Render.addEventListener(humanAttack, Render.computerBoard);

		// SUBSCRIBERS
		PubSub.subscribe('placeShip', Render.renderShip);
		PubSub.subscribe('receiveAttack', Render.renderAttack);
		PubSub.subscribe('receiveAttack', Render.renderAttack);

		// COMPUTER PLACE SHIPS
		computerPlayer.placeAllShips();
	};

	return { init };
})();

export default Game;
