/* eslint-disable no-undef */
import { ship } from '../modules/ship';
import { gameBoard } from '../modules/gameboard';

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
	test('can place a ship in specific coordinates', () => {
		expect(testBoard.showArray(2, 2)).not.toBe("");
	});
	test('cannot place a ship over the board', () => {
		expect(testBoard.showArray(6, 5)).toBe("")
	})
	test.todo('cannot place a ship over another ship coordinates')
	test('can hit a ship with specific coordinates', () => {
		expect(testBoard.receiveAttack(2, 2)).toBe("damaged")
	})
	test('can miss a hit', () => {
		expect(testBoard.receiveAttack(5, 5)).toBe(1)
	})
});
