/* eslint-disable no-undef */
import { ship } from "../modules/ship";
import { gameBoard } from "../modules/gameboard";

const shipName = { length: 3, name: "testerino" };
const testShip = ship(shipName);

describe("SHIP", () => {
  test("ship is not sunk", () => {
    testShip.hit();
    expect(testShip.isSunk()).toBe(false);
  });
  test("ship is sunk", () => {
    testShip.hit();
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk()).toBe(true);
  });
});

describe("GAMEBOARD", () => {
  const testBoard = gameBoard();
  test("can place a ship in specific coordinates", () => {
    expect(testBoard.placeShip(shipName, "horizontal", 2, 2)).toBe("placed");
  });
  test("cannot place a ship outside the board", () => {
    expect(testBoard.placeShip(shipName, "horizontal", 8, 5)).toBe("ship does not fit");
  });
  test("cannot place a ship over another ship coordinates", () => {
		testBoard.placeShip(shipName, "horizontal", 4, 2)
		expect(testBoard.placeShip(shipName, "horizontal", 2, 2)).toBe("place is not empty")
	})
  test("can hit a ship with specific coordinates", () => {
    expect(testBoard.receiveAttack(2, 2)).toBe("hit");
  });
  test("can miss a hit", () => {
    expect(testBoard.receiveAttack(5, 5)).toBe(1);
  });
});
