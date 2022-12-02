import Game from './game';
import { Coordinates } from './types';

export default class Render {
	container = document.querySelector('.container') as HTMLDivElement;
	computerBoard = document.querySelector('.computer-board') as HTMLDivElement;
	humanBoard = document.querySelector('.human-board') as HTMLDivElement;

	#renderBoard(board: HTMLDivElement) {
		for (let x = 0; x < 10; x += 1) {
			for (let y = 0; y < 10; y += 1) {
				const cell = document.createElement('div');
				cell.classList.add('cell');
				cell.setAttribute('data-x', `${y}`);
				cell.setAttribute('data-y', `${x}`);
				board.append(cell);
			}
		}
	}

	renderBoards() {
		this.#renderBoard(this.computerBoard);
		this.#renderBoard(this.humanBoard);
	}

	renderAttack(
		x: Coordinates,
		y: Coordinates,
		type: 'miss' | 'hit',
		player: 'human' | 'computer',
	) {
		const cell = document.querySelector(
			`.${player}-board>[data-x='${x}'][data-y='${y}']`,
		) as HTMLDivElement;

		cell.classList.add(type === 'miss' ? 'miss' : 'hit');
	}

	renderShip(x: Coordinates, y: Coordinates) {
		const cell = document.querySelector(
			`.human-board>[data-x='${x}'][data-y='${y}']`,
		) as HTMLDivElement;
		cell.classList.add('ship');
	}

	addEventListener(
		callback: Game['placeShip'] | Game['humanAttack'] | Game['computerAttack'],
		board: HTMLDivElement,
	) {
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
	}

	win({ player }: { player: 'human' | 'computer' }) {
		const text = document.createElement('p');
		text.textContent = `${player} WINS!`;
		this.container.append(text);
	}
}
