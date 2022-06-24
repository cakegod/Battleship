export const Player = (playerBoard, enemyBoard) => {
	const player = {
		attack: (x, y) => {
			if (enemyBoard.receiveAttack(x, y) === "already attacked") {
				return "already attacked";
			};
		},

		randomAttack: () => {
			const x = Math.floor(Math.random() * 10);
			const y = Math.floor(Math.random() * 10);
			if (enemyBoard.receiveAttack(x, y) === 'already attacked') {
				player.randomAttack();
			}
			enemyBoard.receiveAttack(x, y);

		},

		randomPlaceShip: (ship) => {
			const x = Math.floor(Math.random() * 10);
			const y = Math.floor(Math.random() * 10);
			const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
			if (playerBoard.placeShip(ship, direction, x, y) !== 'placed') {
				player.randomPlaceShip(ship);
        
        
			}
		},
	};
	return player;
};

export default Player;
