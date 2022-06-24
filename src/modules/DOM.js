const DOM = {
	computer: document.querySelector('.computer-board'),
	human: document.querySelector('.human-board'),

};

const render = {
  // Render the board
  board(board)  {
    for (let x = 0; x < 10; x += 1) {
      for (let y = 0; y < 10; y += 1) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-x', y);
        cell.setAttribute('data-y', x);
        board.appendChild(cell);
      }
    }
  },

    // Render the attack on the board
    attack(x, y, board) {
      document.querySelector(`${board}>[data-x='${x}'][data-y='${y}']`).classList = "cell hit";
    },

    attackMiss(x, y, board) {
      document.querySelector(`${board}>[data-x='${x}'][data-y='${y}']`).classList = "cell miss";
    },

    ship(x, y, board) {
      document.querySelector(`${board}>[data-x='${x}'][data-y='${y}']`).classList = "cell ship";
    }
  
}

// Human player attack


export {DOM, render}