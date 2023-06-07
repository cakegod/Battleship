import Ship from './ship';

type ShipLength = 2 | 3 | 4 | 5;
type Direction = 'horizontal' | 'vertical';
type Coordinates = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Player = 'human' | 'computer';
type ValidAttack = 'hit' | 'miss';
type Subscriber = (args: any) => void;
type Board = Ship[][] | ''[][] | 'x'[][];

export {
	ShipLength,
	Direction,
	Coordinates,
	Player,
	ValidAttack,
	Subscriber,
	Board,
};
