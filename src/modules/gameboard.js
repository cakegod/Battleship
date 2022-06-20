import { ship } from "./ship";

export const gameBoard = () => {
  const boardArray = new Array(10);
  for (let i = 0; i < 10; i += 1) {
    boardArray[i] = new Array(10).fill("");
  }

  const carrier = ship({ length: 1, name: "carrier" });
  const battleship = ship({ length: 1, name: "battleship" });
  const destroyer = ship({ length: 1, name: "destroyer" });
  const submarine = ship({ length: 1, name: "submarine" });
  const patrolBoat = ship({ length: 1, name: "patrol boat" });

  const isShipFit = (length, direction, x, y) => {
    switch (direction) {
      case "horizontal":
        return x <= 10 - length;
      case "vertical":
        return y <= 10 - length;
      default: // nothing
    }
  };

  const isPlaceEmpty = (length, direction, x, y) => {
    let empty = true;
    if (direction === "horizontal") {
      for (let i = x; i <= x + length - 1; i += 1) {
        if (boardArray[i][y] !== "") {
          empty = false;
        }
      }
    } else if (direction === "vertical") {
      for (let i = y; i <= y + length - 1; i += 1) {
        if (boardArray[x][i] !== "") {
          empty = false;
        }
      }
    }
    return empty;
  };

  const placeShip = (shipName, direction, x, y) => {
    if (!isShipFit(shipName.length, direction, x, y)) {
      return "ship does not fit";
    }
    if (!isPlaceEmpty(shipName.length, direction, x, y)) {
      return "place is not empty";
    }
    if (direction === "horizontal") {
      for (let i = x; i <= x + shipName.length - 1; i += 1) {
        boardArray[i][y] = ship(shipName);
      }
    } else if (direction === "vertical") {
      for (let i = y; i <= y + shipName.length - 1; i += 1) {
        boardArray[x][i] = ship(shipName);
      }
    }
    return "placed";
  };

  const areShipSunk = () => {
    if (
      carrier.isSunk() &&
      battleship.isSunk() &&
      destroyer.isSunk() &&
      submarine.isSunk() &&
      patrolBoat.isSunk()
    ) {
      return true;
    }
    return false;
  };

  const missedHits = [];

  const receiveAttack = (x, y) => {
    if (boardArray[x][y] !== "") {
      boardArray[x][y].hit();
      areShipSunk();
      return "hit";
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
    areShipSunk,
  };
};

const player = gameBoard();

export default gameBoard;
