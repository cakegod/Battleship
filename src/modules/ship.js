export const Ship = ({ length, name }) => {
	const ship = {
		name,
		length,
		health: Array(length).fill('hitpoint'),
		hit: () => ship.health[ship.health.indexOf('hitpoint')] = 'damaged',
		isSunk: () => !ship.health.includes('hitpoint'),
	};
	return ship;
};

export default Ship;
