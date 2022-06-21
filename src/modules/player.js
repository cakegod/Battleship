export { gameBoard } from "./gameboard";

const player = () => {
  const board = gameBoard();
  computer.board.receiveAttack(y, x);
  return { board };
};

const computer = () => {
  const board = gameBoard();
  const computerAttack = () => {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);

    // It shouldn't attack the same coordinates twice
    if (player.board.receiveAttack(x, y) === "already attacked") {
      computerAttack();
    }
    return "computer attacked";
  };

  return { board };
};
