import Gameboard from '../modules/gameboard';
import { Player, ComputerPlayer } from '../modules/player';
import Ship from '../modules/ship';

describe('player', () => {
	const computerBoard = new Gameboard('computer');
	const playerBoard = new Gameboard('human');
	const humanPlayer = new Player(computerBoard, playerBoard);
	const computerPlayer = new ComputerPlayer(playerBoard, computerBoard);

	describe('can attack', () => {
		let ship = new Ship('mock', 2);
		computerBoard.placeShip(ship, 'horizontal', 0, 0);

		it('and hit ship', () => {
			expect(humanPlayer.attack(0, 0)).toBe('hit');
		});
		it('and miss attack', () => {
			expect(humanPlayer.attack(0, 3)).toBe('miss');
		});
		it('and not attack already attacked position', () => {
			expect(humanPlayer.attack(0, 3)).toBe('already attacked');
		});
	});

	it('ship fleet has 5 ships', () => {
		expect(humanPlayer.shipFleet.length).toBe(5);
	});
});
