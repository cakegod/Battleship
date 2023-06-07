import { PubSub } from '../modules/PubSub';

describe('observers', () => {
	it('are notified when they exist', () => {
		const func = jest.fn();
		PubSub.subscribe('placeShip', func);
		PubSub.notify('placeShip');
		expect(func).toHaveBeenCalled();
	});
	it("are not notified when they don't exist", () => {
		const func = jest.fn();
		PubSub.subscribe('placeShip', func);
		PubSub.unsubscribe("placeShip", func)
		PubSub.notify('placeShip');
		expect(func).not.toHaveBeenCalled();
	});
	it('can be unsubscribed', () => {
		const func = jest.fn();
		PubSub.subscribe('placeShip', func);
		PubSub.notify('placeShip');
		PubSub.unsubscribe('placeShip', func);
		PubSub.subscribe('placeShip', func);
		expect(func).not.toHaveBeenCalledTimes(2);
	});
});
