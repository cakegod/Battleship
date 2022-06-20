export const ship = ({ length, name }) => {
	const shipName = name;
	const health = Array(length).fill('hitpoint');
	const hit = () => (health[health.indexOf('hitpoint')] = 'damaged');
	const isSunk = () => !health.includes('hitpoint');
	return { ship, hit, isSunk };
};

export default ship