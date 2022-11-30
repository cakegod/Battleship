import Gameboard from '../modules/gameboard';
import Ship from '../modules/ship';

let ship = new Ship('mock', 2);
let shipTwo = new Ship('mock', 3);
let gameboard = new Gameboard('human');

beforeEach(() => {
	ship = new Ship('mock', 2);
	gameboard = new Gameboard('human');
});

describe('ship ', () => {
	describe('can check if', () => {
		it('is sunk', () => {
			ship.hit();
			expect(ship.isSunk()).toBe(false);
		});
		it('is not sunk', () => {
			// SHIP ONE
			ship.hit();
			ship.hit();

			// SHIP TWO
			shipTwo.hit();
			shipTwo.hit();
			shipTwo.hit();
			expect(ship.isSunk()).toBe(true);
			expect(shipTwo.isSunk()).toBe(true);
		});
	});

	it('has a name', () => {
		expect(ship.getName()).toEqual('mock');
	});
	it('has a length', () => {
		expect(ship.getLength()).toEqual(2);
	});
});
