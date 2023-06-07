import Render from './render';

type Direction = 'horizontal' | 'vertical';
type Coordinates = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Player = 'human' | 'computer';
type ValidAttack = 'hit' | 'miss';
type Subscriber = (args: any) => void;

export { Direction, Coordinates, Player, ValidAttack, Subscriber };
