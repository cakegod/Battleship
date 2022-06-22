import { Player } from './player';
import { Gameboard } from './gameboard';
import { DOM, render } from './DOM';
import { Ship } from './ship';

export const Game = (() => {
	const carrier = Ship({ length: 5, name: 'carrier' });
	const battleship = Ship({ length: 4, name: 'battleship' });
	const destroyer = Ship({ length: 3, name: 'destroyer' });
	const submarine = Ship({ length: 3, name: 'submarine' });
	const patrolBoat = Ship({ length: 2, name: 'patrol boat' });

	// Create players boards
	const humanBoard = Gameboard("human");
	render.board(DOM.human);
	const computerBoard = Gameboard("computer");
	render.board(DOM.computer);

	// Create players
	const humanPlayer = Player(computerBoard);
	const computerPlayer = Player(humanBoard);

	// Player turn
	DOM.computer.addEventListener('click', (event) => {
		humanPlayer.humanAttack(event.target.dataset.x, event.target.dataset.y);
	});
	// Computer turn
	// computerPlayer.computerAttack();

	computerBoard.placeShip(carrier, 'horizontal', 3, 1);
  computerBoard.placeShip(battleship, 'vertical', 6, 3);
  computerBoard.placeShip(destroyer, 'horizontal', 5, 9);
  computerBoard.placeShip(submarine, 'vertical', 2, 3);
  computerBoard.placeShip(patrolBoat, 'vertical', 9, 4);
  console.table(computerBoard.showArray());

	return { computerBoard, humanBoard };
})();

export default Game;
