import Gameboard from '../modules/gameboard';
import Ship from '../modules/ship';

let ship = new Ship('mock', 2);
let shipTwo = new Ship('mock', 3);
let gameboard = new Gameboard('human');

beforeEach(() => {
	ship = new Ship('mock', 2);
	gameboard = new Gameboard('human');
});

describe('gameboard', () => {
	describe('can place ship', () => {
		it('vertically', () => {
			expect(gameboard.placeShip(ship, 'vertical', 3, 4)).toEqual({
				success: true,
			});
		});
		it('horizontally', () => {
			expect(gameboard.placeShip(ship, 'vertical', 3, 4)).toEqual({
				success: true,
			});
		});
		it('in empty places', () => {
			expect(gameboard.placeShip(ship, 'horizontal', 3, 4)).toEqual({
				success: true,
			});
		});
	});

	describe('cannot place ship', () => {
		it(`outside board`, () => {
			expect(gameboard.placeShip(ship, 'horizontal', 9, 4)).toEqual({
				error: 'does not fit board',
				success: false,
			});
		});
		it(`in occupied places`, () => {
			gameboard.placeShip(ship, 'horizontal', 3, 4);
			gameboard.placeShip(ship, 'vertical', 6, 6);
			expect(gameboard.placeShip(ship, 'horizontal', 3, 4)).toEqual({
				error: 'place is occupied',
				success: false,
			});
			expect(gameboard.placeShip(ship, 'vertical', 6, 6)).toEqual({
				error: 'place is occupied',
				success: false,
			});
		});
	});
	describe('observers', () => {
		it('are notified when they exist', () => {
			const func = jest.fn();
			gameboard.subscribe('placeShip', func);
			gameboard.placeShip(ship, 'horizontal', 2, 2);
			gameboard.placeShip(ship, 'vertical', 7, 7);
			expect(func).toHaveBeenCalled();
		});
		it("are not notified when they don't exist", () => {
			const func = jest.fn();
			gameboard.placeShip(ship, 'horizontal', 2, 2);
			gameboard.placeShip(ship, 'vertical', 7, 7);
			expect(func).not.toHaveBeenCalled();
		});
		it('can be unsubscribed', () => {
			const func = jest.fn();
			gameboard.subscribe('placeShip', func);
			gameboard.notify('placeShip', 1, 1);
			gameboard.unsubscribe('placeShip', func);
			gameboard.subscribe('placeShip', func);
			expect(func).not.toHaveBeenCalledTimes(2);
		});
	});

	describe('can receive attack', () => {
		it('and miss attack', () => {
			expect(gameboard.receiveAttack(0, 0)).toBe('miss');
		});
		it('and not attack already attacked position', () => {
			gameboard.receiveAttack(0, 0);
			expect(gameboard.receiveAttack(0, 0)).toBe('already attacked');
		});
		it('and hit ship', () => {
			gameboard.placeShip(ship, 'horizontal', 0, 0);
			expect(gameboard.receiveAttack(0, 0)).toBe('hit');
		});
	});

	describe('can check if ships are', () => {
		it('sunk', () => {
			gameboard.placeShip(ship, 'horizontal', 0, 0);
			gameboard.receiveAttack(0, 0);
			gameboard.receiveAttack(1, 0);
			expect(gameboard.areShipsSunk()).toBe(true);
		});
		it('not sunk', () => {
			gameboard.placeShip(ship, 'horizontal', 0, 0);
			gameboard.receiveAttack(0, 0);
			expect(gameboard.areShipsSunk()).toBe(false);
		});
	});
});
