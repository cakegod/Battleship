const ship = ({ length, name }) => {
	length;
	name;
	const hit = (position) => {
		return position;
	};
	const isSunk = () => {};

	return { length, name, hit, isSunk };
};

const carrier = ship({ length: 5, name: 'carrier' });
const battleship = ship({ length: 4, name: 'battleship' });
const destroyer = ship({ length: 3, name: 'destroyer' });
const submarine = ship({ length: 3, name: 'submarine' });
const patrolBoat = ship({ length: 2, name: 'patrol boat' });

// Carrier: 5, Battleship: 4, Destroyer: 3, Submarine: 3, Patrol Boat: 2
