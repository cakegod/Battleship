/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "gameBoard": () => (/* binding */ gameBoard)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/modules/ship.js");


const gameBoard = () => {
  const board = new Array(10);
  for (let i = 0; i < 10; i += 1) {
      board[i] = new Array(10).fill("");
  }

  const carrier = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)({ length: 5, name: "carrier" });
  const battleship = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)({ length: 4, name: "battleship" });
  const destroyer = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)({ length: 4, name: "destroyer" });
  const submarine = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)({ length: 3, name: "submarine" });
  const patrolBoat = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)({ length: 2, name: "patrol boat" });

  const isShipFit = (length, direction, x, y) => {
      switch (direction) {
          case "horizontal":
              return x <= 10 - length
          case "vertical":
              return y <= 10 - length
          default:
      }
  };

  const isPlaceEmpty = (length, direction, x, y) => {
      let empty = true;
      if (direction === "horizontal") {
          for (let i = x; i <= x + length - 1; i += 1) {
              if (board[i][y] !== "") {
                  empty = false;
              }
          }
      } else if (direction === "vertical") {
          for (let i = y; i <= y + length - 1; i += 1) {
              if (board[x][i] !== "") {
                  empty = false;
              }
          }
      }
      return empty;
  };

  const placeShip = (shipName, direction, x, y) => {
      shipName.length
      if (!isShipFit(shipName.length, direction, x, y)) {
          return "Ship does not fit";
      }
      if (!isPlaceEmpty(shipName.length, direction, x, y)) {
          return "place is not empty";
      }
      if (direction === "horizontal") {
          for (let i = x; i <= x + shipName.length - 1; i += 1) {
              board[i][y] = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(shipName);
          }
      } else if (direction === "vertical") {
          for (let i = y; i <= y + shipName.length - 1; i += 1) {
              board[x][i] = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(shipName);
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

  // It shouldn't hit the same coordinates twice
  const isMoveLegal = (x, y) => {
      if (board[x][y] === "X") {
          return false;
      }
      return true;
  };

  // It should miss if there are no ships on the coordinates
  const isHitMiss = (x, y) => {
      if (board[x][y] === "") {
          missedHits.push([x, y]);
          board[x][y] = "X";
          return false;
      }
      return true;
  };

  const receiveAttack = (x, y) => {
      if (!isMoveLegal(x, y)) {
          return "illegal move";
      }
      if (!isHitMiss(x, y)) {
          return "miss";
      }
      if (board[x][y] !== "") {
          board[x][y].hit();
          board[x][y] = "X";
          areShipSunk();
          return "hit";
      }

  };

  const showArray = (x, y) => {
      if (x === undefined || y === undefined) {
          return board;
      }
      return board[x][y];
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameBoard);


/***/ }),

/***/ "./src/modules/ship.js":
/*!*****************************!*\
  !*** ./src/modules/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ship": () => (/* binding */ Ship),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Ship = ({ length, name }) => {
	const shipName = name;
	const shipLength = length
	const health = Array(length).fill('hitpoint');
	const hit = () => (health[health.indexOf('hitpoint')] = 'damaged');
	const isSunk = () => !health.includes('hitpoint');
	return { name, length, hit, isSunk };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/ship */ "./src/modules/ship.js");
/* harmony import */ var _modules_gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/gameboard */ "./src/modules/gameboard.js");


const shipName = { length: 3, name: "testerino" };
const testShip = (0,_modules_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)(shipName);
console.table(testShip)
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQThCOztBQUV2QjtBQUNQO0FBQ0Esa0JBQWtCLFFBQVE7QUFDMUI7QUFDQTs7QUFFQSxrQkFBa0IsMkNBQUksR0FBRyw0QkFBNEI7QUFDckQscUJBQXFCLDJDQUFJLEdBQUcsK0JBQStCO0FBQzNELG9CQUFvQiwyQ0FBSSxHQUFHLDhCQUE4QjtBQUN6RCxvQkFBb0IsMkNBQUksR0FBRyw4QkFBOEI7QUFDekQscUJBQXFCLDJDQUFJLEdBQUcsZ0NBQWdDOztBQUU1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLHFCQUFxQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUiwwQkFBMEIscUJBQXFCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQiw4QkFBOEI7QUFDeEQsNEJBQTRCLDJDQUFJO0FBQ2hDO0FBQ0EsUUFBUTtBQUNSLDBCQUEwQiw4QkFBOEI7QUFDeEQsNEJBQTRCLDJDQUFJO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxTQUFTLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuSWxCLGdCQUFnQixjQUFjO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7O0FBRUEsaUVBQWU7Ozs7OztVQ1RmO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTm9DO0FBQ1U7QUFDOUMsbUJBQW1CO0FBQ25CLGlCQUFpQixtREFBSTtBQUNyQix1QiIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL3NoaXBcIjtcblxuZXhwb3J0IGNvbnN0IGdhbWVCb2FyZCA9ICgpID0+IHtcbiAgY29uc3QgYm9hcmQgPSBuZXcgQXJyYXkoMTApO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcbiAgICAgIGJvYXJkW2ldID0gbmV3IEFycmF5KDEwKS5maWxsKFwiXCIpO1xuICB9XG5cbiAgY29uc3QgY2FycmllciA9IFNoaXAoeyBsZW5ndGg6IDUsIG5hbWU6IFwiY2FycmllclwiIH0pO1xuICBjb25zdCBiYXR0bGVzaGlwID0gU2hpcCh7IGxlbmd0aDogNCwgbmFtZTogXCJiYXR0bGVzaGlwXCIgfSk7XG4gIGNvbnN0IGRlc3Ryb3llciA9IFNoaXAoeyBsZW5ndGg6IDQsIG5hbWU6IFwiZGVzdHJveWVyXCIgfSk7XG4gIGNvbnN0IHN1Ym1hcmluZSA9IFNoaXAoeyBsZW5ndGg6IDMsIG5hbWU6IFwic3VibWFyaW5lXCIgfSk7XG4gIGNvbnN0IHBhdHJvbEJvYXQgPSBTaGlwKHsgbGVuZ3RoOiAyLCBuYW1lOiBcInBhdHJvbCBib2F0XCIgfSk7XG5cbiAgY29uc3QgaXNTaGlwRml0ID0gKGxlbmd0aCwgZGlyZWN0aW9uLCB4LCB5KSA9PiB7XG4gICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICAgIGNhc2UgXCJob3Jpem9udGFsXCI6XG4gICAgICAgICAgICAgIHJldHVybiB4IDw9IDEwIC0gbGVuZ3RoXG4gICAgICAgICAgY2FzZSBcInZlcnRpY2FsXCI6XG4gICAgICAgICAgICAgIHJldHVybiB5IDw9IDEwIC0gbGVuZ3RoXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgIH1cbiAgfTtcblxuICBjb25zdCBpc1BsYWNlRW1wdHkgPSAobGVuZ3RoLCBkaXJlY3Rpb24sIHgsIHkpID0+IHtcbiAgICAgIGxldCBlbXB0eSA9IHRydWU7XG4gICAgICBpZiAoZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgICAgIGZvciAobGV0IGkgPSB4OyBpIDw9IHggKyBsZW5ndGggLSAxOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgaWYgKGJvYXJkW2ldW3ldICE9PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICBlbXB0eSA9IGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgICAgIGZvciAobGV0IGkgPSB5OyBpIDw9IHkgKyBsZW5ndGggLSAxOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgaWYgKGJvYXJkW3hdW2ldICE9PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICBlbXB0eSA9IGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGVtcHR5O1xuICB9O1xuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChzaGlwTmFtZSwgZGlyZWN0aW9uLCB4LCB5KSA9PiB7XG4gICAgICBzaGlwTmFtZS5sZW5ndGhcbiAgICAgIGlmICghaXNTaGlwRml0KHNoaXBOYW1lLmxlbmd0aCwgZGlyZWN0aW9uLCB4LCB5KSkge1xuICAgICAgICAgIHJldHVybiBcIlNoaXAgZG9lcyBub3QgZml0XCI7XG4gICAgICB9XG4gICAgICBpZiAoIWlzUGxhY2VFbXB0eShzaGlwTmFtZS5sZW5ndGgsIGRpcmVjdGlvbiwgeCwgeSkpIHtcbiAgICAgICAgICByZXR1cm4gXCJwbGFjZSBpcyBub3QgZW1wdHlcIjtcbiAgICAgIH1cbiAgICAgIGlmIChkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IHg7IGkgPD0geCArIHNoaXBOYW1lLmxlbmd0aCAtIDE7IGkgKz0gMSkge1xuICAgICAgICAgICAgICBib2FyZFtpXVt5XSA9IFNoaXAoc2hpcE5hbWUpO1xuICAgICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0geTsgaSA8PSB5ICsgc2hpcE5hbWUubGVuZ3RoIC0gMTsgaSArPSAxKSB7XG4gICAgICAgICAgICAgIGJvYXJkW3hdW2ldID0gU2hpcChzaGlwTmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIFwicGxhY2VkXCI7XG4gIH07XG5cbiAgY29uc3QgYXJlU2hpcFN1bmsgPSAoKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgICAgY2Fycmllci5pc1N1bmsoKSAmJlxuICAgICAgICAgIGJhdHRsZXNoaXAuaXNTdW5rKCkgJiZcbiAgICAgICAgICBkZXN0cm95ZXIuaXNTdW5rKCkgJiZcbiAgICAgICAgICBzdWJtYXJpbmUuaXNTdW5rKCkgJiZcbiAgICAgICAgICBwYXRyb2xCb2F0LmlzU3VuaygpXG4gICAgICApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBjb25zdCBtaXNzZWRIaXRzID0gW107XG5cbiAgLy8gSXQgc2hvdWxkbid0IGhpdCB0aGUgc2FtZSBjb29yZGluYXRlcyB0d2ljZVxuICBjb25zdCBpc01vdmVMZWdhbCA9ICh4LCB5KSA9PiB7XG4gICAgICBpZiAoYm9hcmRbeF1beV0gPT09IFwiWFwiKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgLy8gSXQgc2hvdWxkIG1pc3MgaWYgdGhlcmUgYXJlIG5vIHNoaXBzIG9uIHRoZSBjb29yZGluYXRlc1xuICBjb25zdCBpc0hpdE1pc3MgPSAoeCwgeSkgPT4ge1xuICAgICAgaWYgKGJvYXJkW3hdW3ldID09PSBcIlwiKSB7XG4gICAgICAgICAgbWlzc2VkSGl0cy5wdXNoKFt4LCB5XSk7XG4gICAgICAgICAgYm9hcmRbeF1beV0gPSBcIlhcIjtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHgsIHkpID0+IHtcbiAgICAgIGlmICghaXNNb3ZlTGVnYWwoeCwgeSkpIHtcbiAgICAgICAgICByZXR1cm4gXCJpbGxlZ2FsIG1vdmVcIjtcbiAgICAgIH1cbiAgICAgIGlmICghaXNIaXRNaXNzKHgsIHkpKSB7XG4gICAgICAgICAgcmV0dXJuIFwibWlzc1wiO1xuICAgICAgfVxuICAgICAgaWYgKGJvYXJkW3hdW3ldICE9PSBcIlwiKSB7XG4gICAgICAgICAgYm9hcmRbeF1beV0uaGl0KCk7XG4gICAgICAgICAgYm9hcmRbeF1beV0gPSBcIlhcIjtcbiAgICAgICAgICBhcmVTaGlwU3VuaygpO1xuICAgICAgICAgIHJldHVybiBcImhpdFwiO1xuICAgICAgfVxuXG4gIH07XG5cbiAgY29uc3Qgc2hvd0FycmF5ID0gKHgsIHkpID0+IHtcbiAgICAgIGlmICh4ID09PSB1bmRlZmluZWQgfHwgeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIGJvYXJkO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGJvYXJkW3hdW3ldO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgICBwbGFjZVNoaXAsXG4gICAgICByZWNlaXZlQXR0YWNrLFxuICAgICAgc2hvd0FycmF5LFxuICAgICAgY2FycmllcixcbiAgICAgIGJhdHRsZXNoaXAsXG4gICAgICBkZXN0cm95ZXIsXG4gICAgICBzdWJtYXJpbmUsXG4gICAgICBwYXRyb2xCb2F0LFxuICAgICAgYXJlU2hpcFN1bmssXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBnYW1lQm9hcmQ7XG4iLCJleHBvcnQgY29uc3QgU2hpcCA9ICh7IGxlbmd0aCwgbmFtZSB9KSA9PiB7XG5cdGNvbnN0IHNoaXBOYW1lID0gbmFtZTtcblx0Y29uc3Qgc2hpcExlbmd0aCA9IGxlbmd0aFxuXHRjb25zdCBoZWFsdGggPSBBcnJheShsZW5ndGgpLmZpbGwoJ2hpdHBvaW50Jyk7XG5cdGNvbnN0IGhpdCA9ICgpID0+IChoZWFsdGhbaGVhbHRoLmluZGV4T2YoJ2hpdHBvaW50JyldID0gJ2RhbWFnZWQnKTtcblx0Y29uc3QgaXNTdW5rID0gKCkgPT4gIWhlYWx0aC5pbmNsdWRlcygnaGl0cG9pbnQnKTtcblx0cmV0dXJuIHsgbmFtZSwgbGVuZ3RoLCBoaXQsIGlzU3VuayB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2hpcCIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtTaGlwfSBmcm9tIFwiLi9tb2R1bGVzL3NoaXBcIjtcbmltcG9ydCB7Z2FtZUJvYXJkfSBmcm9tIFwiLi9tb2R1bGVzL2dhbWVib2FyZFwiO1xuY29uc3Qgc2hpcE5hbWUgPSB7IGxlbmd0aDogMywgbmFtZTogXCJ0ZXN0ZXJpbm9cIiB9O1xuY29uc3QgdGVzdFNoaXAgPSBTaGlwKHNoaXBOYW1lKTtcbmNvbnNvbGUudGFibGUodGVzdFNoaXApIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9