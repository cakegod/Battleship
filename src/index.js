const ship = ({ length, name }) => {
	const ship = name;
	const health = Array(length).fill('hitpoint');
	const hit = () => (health[health.indexOf('hitpoint')] = 'damaged');
	const isSunk = () => !health.includes('hitpoint');
	return { ship, hit, isSunk, health };
};

const gameBoard = () => {
	const boardArray = new Array(10);
	for (let i = 0; i < 10; i++) {
		boardArray[i] = new Array(10).fill('');
	}
	const placeShip = (shipName, direction, x, y) => {
		const newShip = ship(shipName);
		if (direction === 'horizontal') {
			for (let i = x; i <= x + shipName.length - 1; i++) {
				boardArray[i][y] = newShip;
			}
		} else {
			for (let i = y; i <= y + shipName.length - 1; i++) {
				boardArray[x][i] = newShip;
			}
		}
	};
	const receiveAttack = (x, y) => {
		if (boardArray[x][y] !== '') {
			return boardArray[x][y].hit();
		} else {
			missedHits.push([x, y]);
		}
	};
	const missedHits = [];
	return { placeShip, receiveAttack, boardArray };
};

const carrier = { length: 5, name: 'carrier' };
const battleship = { length: 4, name: 'battleship' };
const destroyer = { length: 3, name: 'destroyer' };
const submarine = { length: 3, name: 'submarine' };
const patrolBoat = { length: 2, name: 'patrol boat' };

const playerBoard = gameBoard();

export { ship, gameBoard };
