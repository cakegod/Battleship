import Gameboard from '../modules/gameboard';
import { HumanPlayer, ComputerPlayer } from '../modules/player';
import Ship from '../modules/ship';

const computerBoard = new Gameboard('computer');
const playerBoard = new Gameboard('human');
const humanPlayer = new HumanPlayer(computerBoard, playerBoard);
const computerPlayer = new ComputerPlayer(playerBoard, computerBoard);

describe('player', () => {
	describe('can attack', () => {
		let ship = new Ship('mock', 2);
		computerBoard.placeShip(ship, 'horizontal', 0, 0);

		it('and hit ship', () => {
			expect(humanPlayer.attack(0, 0)).toBe(true);
		});
		it('and miss attack', () => {
			expect(humanPlayer.attack(0, 3)).toBe(true);
		});
		it('and not attack already attacked position', () => {
			expect(humanPlayer.attack(0, 3)).toBe(false);
		});
	});

	it('can place ship', () => {
		expect(humanPlayer.placeShip(1, 1)).toBe('placed');
	});

	describe('cannot place ships', () => {
		it('in the same position', () => {
			expect(humanPlayer.placeShip(1, 1)).toBe('cannot place ship');
		});
		it('if there are no more ships', () => {
			humanPlayer.placeShip(0, 0);
			humanPlayer.placeShip(3, 7);
			humanPlayer.placeShip(6, 4);
			humanPlayer.placeShip(1, 2);
			humanPlayer.placeShip(3, 4);
			expect(humanPlayer.placeShip(0, 0)).toBe('no more ships');
			expect(humanPlayer.shipFleet.isShipFleetEmpty()).toBeTruthy();
		});
	});
});

describe('computer player', () => {
	it('can attack randomly', () => {
		expect(computerPlayer.attack()).toBeTruthy();
	});
});
