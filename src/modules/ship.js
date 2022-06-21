export const Ship = ({ length, name }) => {
	const shipName = name;
	const shipLength = length
	const health = Array(length).fill('hitpoint');
	const hit = () => (health[health.indexOf('hitpoint')] = 'damaged');
	const isSunk = () => !health.includes('hitpoint');
	return { name, length, hit, isSunk };
};

export default Ship