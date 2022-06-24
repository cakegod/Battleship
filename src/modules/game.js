import { Player } from './player';
import { Gameboard } from './gameboard';
import { DOM, render } from './DOM';

// Phase 1: Players place the ships on the gameboard
// Players should not be able to attack the enemy board during this phase
// Human player places the ships using an event listener
// Computer player places the ships using a random algorithm

// Phase 2: Players take turns attacking each other
// Players should be able to attack the enemy board during this phase
// Human player attacks the enemy board using an event listener
// Computer player attacks the enemy board using a random algorithm
// This phase should warn when all ships are sunk using the gameboard.areShipSunk() method

export const Game = (() => {
	const humanBoard = Gameboard('.human-board', '.computer-board');
	const computerBoard = Gameboard('.computer-board', '.human-board');
	const humanPlayer = Player(humanBoard, computerBoard);
	const computerPlayer = Player(computerBoard, humanBoard);

	// Render the boards
	render.board(DOM.human);
	render.board(DOM.computer);

	const phaseTwo = () => {
		// Human player attacks the enemy board
		DOM.computer.addEventListener('click', (event) => {
			// Shouldn't attack the same coordinates twice
			if (
				humanPlayer.attack(+event.target.dataset.x, +event.target.dataset.y) ===
				'already attacked'
			) {
				return;
			}

			checkWin();

			// Computer player attacks the human board
			computerPlayer.randomAttack();
		});
	};

	const checkWin = () => {
		if (computerBoard.areShipSunk()) {
			alert('You win!');
		} else if (humanBoard.areShipSunk()) {
			alert('You lose!');
		}
	};

	let direction = 'horizontal';

	const phaseOne = () => {
		// Human player places the ships
		function placeShips(event) {
			if (
				humanBoard.placeShip(
					humanBoard.shipyard[0],
					direction,
					+event.target.dataset.x,
					+event.target.dataset.y,
				) !== 'placed'
			) {
				return 'cannot place the ship here';
			}

			// Remove placed ship
			humanBoard.shipyard.shift();

			// Call phase two when ships are all placed
			if (humanBoard.shipyard.length === 0) {
				phaseTwo();
				DOM.human.removeEventListener('click', placeShips);
			}
		}

		// Computer player places the ships on the board
		computerBoard.shipyard.forEach((ship) =>
			computerPlayer.randomPlaceShip(ship),
		);

		window.addEventListener('dblclick', () => {
			if (direction === 'horizontal') {
				direction = 'vertical';
				return;
			}
			direction = 'horizontal';
		});

		// Human player places the ships on the board
		DOM.human.addEventListener('click', placeShips);
	};

	phaseOne();

	return { computerBoard, humanBoard };
})();
export default Game;
