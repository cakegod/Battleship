import Gameboard from '../modules/gameboard';
import Ship from '../modules/ship';

let ship = new Ship('mock', 2);
const shipTwo = new Ship('mock', 3);
let gameboard = new Gameboard('human');

beforeEach(() => {
	ship = new Ship('mock', 2);
	gameboard = new Gameboard('human');
});

describe('ship ', () => {
	describe('can check if', () => {
		it('is sunk', () => {
			ship.takeHit();
			expect(ship.isSunken()).toBe(false);
		});
		it('is not sunk', () => {
			// SHIP ONE
			ship.takeHit();
			ship.takeHit();

			// SHIP TWO
			shipTwo.takeHit();
			shipTwo.takeHit();
			shipTwo.takeHit();
			expect(ship.isSunken()).toBe(true);
			expect(shipTwo.isSunken()).toBe(true);
		});
	});

	it('has a name', () => {
		expect(ship.getName()).toEqual('mock');
	});
	it('has a length', () => {
		expect(ship.getLength()).toEqual(2);
	});
});
