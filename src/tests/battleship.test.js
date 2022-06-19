import { ship } from '../index';

describe('SHIP', () => {
	const testShip = ship({ length: 3, name: 'destroyer' });
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
