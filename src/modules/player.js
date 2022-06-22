import { DOM, render } from "./DOM";
import { Gameboard } from "./gameboard";

export const Player = (enemyBoard) => {
  const player = {
    humanAttack:(x, y) => {
      enemyBoard.receiveAttack(x, y);
      render.attack(x, y, ".computer-board")
    },
  
    computerAttack: () => {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      if (enemyBoard.receiveAttack(x, y) === "already attacked") {
        player.computerAttack();
      }
      enemyBoard.receiveAttack(x, y);
      render.attack(x, y, ".human-board");
      
      return "computer attacked";
    },
  }

  return player;
};


export default Player;