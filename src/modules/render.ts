import { Coordinates, Player, ValidAttack } from './types';

const Render = (() => {
	const container = document.querySelector('.container') as HTMLDivElement;
	const computerBoard = document.querySelector(
		'.computer-board',
	) as HTMLDivElement;
	const humanBoard = document.querySelector('.human-board') as HTMLDivElement;

	const renderBoard = (board: HTMLDivElement) => {
		for (let x = 0; x < 10; x += 1) {
			for (let y = 0; y < 10; y += 1) {
				const cell = document.createElement('div');
				cell.classList.add('cell');
				cell.setAttribute('data-x', `${y}`);
				cell.setAttribute('data-y', `${x}`);
				board.append(cell);
			}
		}
	};

	const renderBoards = () => {
		renderBoard(computerBoard);
		renderBoard(humanBoard);
	};

	const renderAttack = (
		x: Coordinates,
		y: Coordinates,
		type: ValidAttack,
		player: Player,
	) => {
		const cell = document.querySelector(
			`.${player}-board>[data-x='${x}'][data-y='${y}']`,
		) as HTMLDivElement;

		cell.classList.add(type === 'miss' ? 'miss' : 'hit');
	};

	const renderShip = (x: Coordinates, y: Coordinates) => {
		const cell = document.querySelector(
			`.human-board>[data-x='${x}'][data-y='${y}']`,
		) as HTMLDivElement;
		cell.classList.add('ship');
	};

	const addEventListener = (
		callback: (x: Coordinates, y: Coordinates) => void,
		board: HTMLDivElement,
	) => {
		board.addEventListener('click', (event) => {
			if (!(event.target instanceof HTMLElement)) {
				return;
			}
			if (!event.target.classList.contains('cell')) return;
			const { x } = event.target.dataset;
			const xCoordinates = Number(x) as Coordinates;
			const { y } = event.target.dataset;
			const yCoordinates = Number(y) as Coordinates;

			callback(xCoordinates, yCoordinates);
		});
	};

	const win = (player: Player) => {
		const text = document.createElement('p');
		text.textContent = `${player} WINS!`;
		container.append(text);
	};

	return {
		renderBoards,
		renderAttack,
		renderShip,
		addEventListener,
		win,

		get humanBoard() {
			return humanBoard;
		},

		get computerBoard() {
			return computerBoard;
		},
	};
})();

export default Render;
