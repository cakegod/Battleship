/* eslint-disable  */
/* @jest-environment jsdom */

import Gameboard from '../modules/gameboard';
import Ship from '../modules/ship';

describe('ship ', () => {
	it('does not sunk', () => {
		const ship = new Ship('mock', 2);
		ship.hit();
		expect(ship.isSunk()).toBe(false);
	});
	it('does sunk', () => {
		const ship = new Ship('mock', 2);
		const shipTwo = new Ship('mock', 3);
		ship.hit();
		ship.hit();
		shipTwo.hit();
		shipTwo.hit();
		shipTwo.hit();
		expect(ship.isSunk()).toBe(true);
		expect(shipTwo.isSunk()).toBe(true);
	});
	it('has a length getter', () => {
		const ship = new Ship('mock', 2);
		expect(ship.getLength()).toEqual(2);
	});
});

describe('gameboard', () => {
	const gameboard = new Gameboard('human');
	const ship = new Ship('mock', 2);
	it('places ships in empty places', () => {
		expect(gameboard.placeShip(ship, 'horizontal', 3, 4)).toBe(
			'has been placed',
		);
	});
	it(`does not place ships outside board`, () => {
		expect(gameboard.placeShip(ship, 'horizontal', 9, 4)).toBe(
			'does not fit board',
		);
	});
	it(`does not place ships in occupied places`, () => {
		expect(gameboard.placeShip(ship, 'horizontal', 3, 4)).toBe(
			'place is occupied',
		);
	});

	describe('receives attack', () => {
		it('misses attack', () => {
			const gameboard = new Gameboard('human');
			expect(gameboard.receiveAttack(0, 0)).toBe('miss');
		});
		it('does not attack already attacked positions', () => {
			const gameboard = new Gameboard('human');
			gameboard.receiveAttack(0, 0);
			expect(gameboard.receiveAttack(0, 0)).toBe('already attacked');
		});
		it('and hits ship', () => {
			const gameboard = new Gameboard('human');
			const ship = new Ship('mock', 2);
			gameboard.placeShip(ship, 'horizontal', 0, 0);
			expect(gameboard.receiveAttack(0, 0)).toBe('hit');
		});
	});

	describe('checks sunk', () => {
		it('true', () => {
			const ship = new Ship('mock', 2);
			const gameboard = new Gameboard('human');
			gameboard.placeShip(ship, 'horizontal', 0, 0);
			gameboard.receiveAttack(0, 0);
			gameboard.receiveAttack(1, 0);
			expect(gameboard.areShipsSunk()).toBe(true);
		});
		it('false', () => {
			const ship = new Ship('mock', 2);
			const gameboard = new Gameboard('human');
			gameboard.placeShip(ship, 'horizontal', 0, 0);
			gameboard.receiveAttack(0, 0);
			expect(gameboard.areShipsSunk()).toBe(false);
		});
	});
});

// describe("GAMEBOARD", () => {
//   const testBoard = Gameboard();
//   test("can place a ship in specific coordinates", () => {
//     expect(testBoard.placeShip(shipName, "horizontal", 2, 2)).toBe("placed");
//   });
//   test("cannot place a ship outside the board", () => {
//     expect(testBoard.placeShip(shipName, "horizontal", 8, 5)).toBe(
//       "ship does not fit"
//     );
//   });
//   test("cannot place a ship over another ship coordinates", () => {
//     testBoard.placeShip(shipName, "horizontal", 4, 2);
//     expect(testBoard.placeShip(shipName, "horizontal", 2, 2)).toBe(
//       "place is not empty"
//     );
//   });
//   test("can hit a ship with specific coordinates", () => {
//     expect(testBoard.receiveAttack(2, 2)).toBe("hit");
//   });
//   test("can miss a hit", () => {
//     expect(testBoard.receiveAttack(5, 5)).toBe("miss");
//   });
//   test("cannot attack the same coordinates twice", () => {
//     testBoard.receiveAttack(2, 2);
//     expect(testBoard.receiveAttack(2, 2)).toBe("already attacked");
//   });
// });
