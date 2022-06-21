import {Ship} from "./modules/ship";
import {gameBoard} from "./modules/gameboard";
const shipName = { length: 3, name: "testerino" };
const testShip = Ship(shipName);
console.table(testShip)