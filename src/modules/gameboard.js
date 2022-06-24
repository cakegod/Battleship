import { Ship } from './ship';
import { render } from './DOM';

export const Gameboard = (playerBoardDOM, enemyBoardDOM) => {
	const board = new Array(10);
	for (let i = 0; i < 10; i += 1) {
		board[i] = new Array(10).fill('');
	}

	const isShipFit = (length, direction, x, y) => {
		switch (direction) {
			case 'horizontal':
				return x <= 10 - length;
			case 'vertical':
				return y <= 10 - length;
			default: // nothing
		}
	};

	const isPlaceEmpty = (length, direction, x, y) => {
		let empty = true;
		if (direction === 'horizontal') {
			for (let i = x; i <= x + length - 1; i += 1) {
				if (board[i][y] !== '') {
					empty = false;
				}
			}
		} else if (direction === 'vertical') {
			for (let i = y; i <= y + length - 1; i += 1) {
				if (board[x][i] !== '') {
					empty = false;
				}
			}
		}
		return empty;
	};

	const isMoveLegal = (x, y) => {
		if (board[x][y] === 'X') {
			return false;
		}
		return true;
	};

	const isHitMiss = (x, y) => {
		if (board[x][y] === '') {
			board[x][y] = 'X';
			return false;
		}
		return true;
	};

	const carrier = Ship({ length: 5, name: 'carrier' });
	const battleship = Ship({ length: 4, name: 'battleship' });
	const destroyer = Ship({ length: 3, name: 'destroyer' });
	const submarine = Ship({ length: 3, name: 'submarine' });
	const patrolBoat = Ship({ length: 2, name: 'patrol boat' });

	const gameboard = {
		playerBoardDOM,
		enemyBoardDOM,
		shipyard: [carrier, battleship, destroyer, submarine, patrolBoat],

		placeShip: (shipName, direction, x, y) => {
			// Check if the ship fits on the board
			if (!isShipFit(shipName.length, direction, x, y)) {
				return 'ship does not fit';
			}
			// Check if place is empty
			if (!isPlaceEmpty(shipName.length, direction, x, y)) {
				return 'place is not empty';
			}
			// Place the ship depending on the direction
			if (direction === 'horizontal') {
				for (let i = x; i <= x + shipName.length - 1; i += 1) {
					board[i][y] = shipName;
					// render ships
					if (playerBoardDOM === '.human-board') {
						render.ship(i, y, `${gameboard.playerBoardDOM}`);
					}
				}
			} else if (direction === 'vertical') {
				for (let i = y; i <= y + shipName.length - 1; i += 1) {
					board[x][i] = shipName;
					// render ships
					if (playerBoardDOM === '.human-board') {
						render.ship(x, i, `${gameboard.playerBoardDOM}`);
					}
				}
			}
			return 'placed';
		},

		areShipSunk: () => {
			if (
				carrier.isSunk() &&
				battleship.isSunk() &&
				destroyer.isSunk() &&
				submarine.isSunk() &&
				patrolBoat.isSunk()
			) {
				return true;
			}
			return false;
		},

		receiveAttack: (x, y) => {
			// It shouldn't attack the same coordinates twice
			if (!isMoveLegal(x, y)) {
				return 'already attacked';
			}
			// It should miss if there are no ships on the coordinates
			if (!isHitMiss(x, y)) {
				render.attackMiss(x, y, gameboard.playerBoardDOM);
				return 'miss';
			}
			// It should hit if there is a ship on the coordinates
			board[x][y].hit();
			board[x][y] = 'X';
			render.attack(x, y, playerBoardDOM);
			return 'hit';
		},

		showArray: (x, y) => {
			if (x === undefined || y === undefined) {
				return board;
			}
			return board[x][y];
		},
	};

	return gameboard;
};

export default Gameboard;
