const ship = ({ length, name }) => {
	const shipName = name;
	const health = Array(length).fill('hitpoint');
	const hit = () => (health[health.indexOf('hitpoint')] = 'damaged');
	const isSunk = () => !health.includes('hitpoint');
	return { hit, isSunk };
};

const gameBoard = () => {
	const placeShip = (x, y, orientation) => {};
	const receiveAttack = (x, y) => {};
	return {};
};

const carrier = ship({ length: 5, name: 'carrier' });
const battleship = ship({ length: 4, name: 'battleship' });
const destroyer = ship({ length: 3, name: 'destroyer' });
const submarine = ship({ length: 3, name: 'submarine' });
const patrolBoat = ship({ length: 2, name: 'patrol boat' });

export { ship };
