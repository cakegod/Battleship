import { ship } from "./ship";

export const gameBoard = () => {
  const boardArray = new Array(10);
  for (let i = 0; i < 10; i += 1) {
    boardArray[i] = new Array(10).fill("");
  }


  const carrier = { length: 5, name: "carrier" };
  const battleship = { length: 4, name: "battleship" };
  const destroyer = { length: 3, name: "destroyer" };
  const submarine = { length: 3, name: "submarine" };
  const patrolBoat = { length: 2, name: "patrol boat" };

  const placeShip = (shipName, direction, x, y) => {
    if (direction === "horizontal" && x <= 10 - shipName.length) {
      for (let i = x; i <= x + shipName.length - 1; i += 1) {
        boardArray[i][y] = ship(shipName);
      }
    } else if (direction === "vertical" && y <= 10 - shipName.length) {
      for (let i = y; i <= y + shipName.length - 1; i += 1) {
        boardArray[x][i] = ship(shipName);
      }
    }
  };

  const missedHits = [];

  const receiveAttack = (x, y) => {
    if (boardArray[x][y] !== "") {
      return boardArray[x][y].hit();
    }
    return missedHits.push([x, y]);
  };

  const showArray = (x, y) => {
    if (x === undefined || y === undefined) {
      return boardArray;
    }
    return boardArray[x][y];
  };

  return {
    placeShip,
    receiveAttack,
    showArray,
    carrier,
    battleship,
    destroyer,
    submarine,
    patrolBoat,
  };
};

const player = gameBoard();

export default gameBoard;
