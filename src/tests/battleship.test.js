import { ship, gameBoard } from '../index';

const shipName = { length: 3, name: 'testerino' };
const testShip = ship(shipName);

describe('SHIP', () => {
	test('ship is not sunk', () => {
		testShip.hit();
		expect(testShip.isSunk()).toBe(false);
	});
	test('ship is sunk', () => {
		testShip.hit();
		testShip.hit();
		testShip.hit();
		expect(testShip.isSunk()).toBe(true);
	});
});

describe('GAMEBOARD', () => {
	const testBoard = gameBoard();
	testBoard.placeShip(shipName, 'horizontal', 2, 2);
	test('places a ship in specific coordinates', () => {
		expect(testBoard.boardArray[3][2]).not.toBe("");
	});
	test('can hit a ship with specific coordinates', () => {
		expect(testBoard.receiveAttack(2, 2)).toBe("damaged")
	})
});
