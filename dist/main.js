/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameBoard": () => (/* binding */ gameBoard),
/* harmony export */   "ship": () => (/* binding */ ship)
/* harmony export */ });
const ship = ({ length, name }) => {
	const ship = name;
	const health = Array(length).fill('hitpoint');
	const hit = () => (health[health.indexOf('hitpoint')] = 'damaged');
	const isSunk = () => !health.includes('hitpoint');
	return { ship, hit, isSunk, health };
};

const gameBoard = () => {
	const boardArray = new Array(10);
	for (let i = 0; i < 10; i++) {
		boardArray[i] = new Array(10).fill('');
	}
	const placeShip = (shipName, direction, x, y) => {
		const newShip = ship(shipName);
		if (direction === 'horizontal') {
			for (let i = x; i <= x + shipName.length - 1; i++) {
				boardArray[i][y] = newShip;
			}
		} else {
			for (let i = y; i <= y + shipName.length - 1; i++) {
				boardArray[x][i] = newShip;
			}
		}
	};
	const receiveAttack = (x, y) => {
		if (boardArray[x][y] !== '') {
			return boardArray[x][y].hit();
		} else {
			missedHits.push([x, y]);
		}
	};
	const missedHits = [];
	return { placeShip, receiveAttack, boardArray };
};

const carrier = { length: 5, name: 'carrier' };
const battleship = { length: 4, name: 'battleship' };
const destroyer = { length: 3, name: 'destroyer' };
const submarine = { length: 3, name: 'submarine' };
const patrolBoat = { length: 2, name: 'patrol boat' };

const playerBoard = gameBoard();



/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOQSxnQkFBZ0IsY0FBYztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLFFBQVE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQiw4QkFBOEI7QUFDakQ7QUFDQTtBQUNBLElBQUk7QUFDSixtQkFBbUIsOEJBQThCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWOztBQUVBLGtCQUFrQjtBQUNsQixxQkFBcUI7QUFDckIsb0JBQW9CO0FBQ3BCLG9CQUFvQjtBQUNwQixxQkFBcUI7O0FBRXJCOztBQUUyQiIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiY29uc3Qgc2hpcCA9ICh7IGxlbmd0aCwgbmFtZSB9KSA9PiB7XG5cdGNvbnN0IHNoaXAgPSBuYW1lO1xuXHRjb25zdCBoZWFsdGggPSBBcnJheShsZW5ndGgpLmZpbGwoJ2hpdHBvaW50Jyk7XG5cdGNvbnN0IGhpdCA9ICgpID0+IChoZWFsdGhbaGVhbHRoLmluZGV4T2YoJ2hpdHBvaW50JyldID0gJ2RhbWFnZWQnKTtcblx0Y29uc3QgaXNTdW5rID0gKCkgPT4gIWhlYWx0aC5pbmNsdWRlcygnaGl0cG9pbnQnKTtcblx0cmV0dXJuIHsgc2hpcCwgaGl0LCBpc1N1bmssIGhlYWx0aCB9O1xufTtcblxuY29uc3QgZ2FtZUJvYXJkID0gKCkgPT4ge1xuXHRjb25zdCBib2FyZEFycmF5ID0gbmV3IEFycmF5KDEwKTtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0Ym9hcmRBcnJheVtpXSA9IG5ldyBBcnJheSgxMCkuZmlsbCgnJyk7XG5cdH1cblx0Y29uc3QgcGxhY2VTaGlwID0gKHNoaXBOYW1lLCBkaXJlY3Rpb24sIHgsIHkpID0+IHtcblx0XHRjb25zdCBuZXdTaGlwID0gc2hpcChzaGlwTmFtZSk7XG5cdFx0aWYgKGRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG5cdFx0XHRmb3IgKGxldCBpID0geDsgaSA8PSB4ICsgc2hpcE5hbWUubGVuZ3RoIC0gMTsgaSsrKSB7XG5cdFx0XHRcdGJvYXJkQXJyYXlbaV1beV0gPSBuZXdTaGlwO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRmb3IgKGxldCBpID0geTsgaSA8PSB5ICsgc2hpcE5hbWUubGVuZ3RoIC0gMTsgaSsrKSB7XG5cdFx0XHRcdGJvYXJkQXJyYXlbeF1baV0gPSBuZXdTaGlwO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0Y29uc3QgcmVjZWl2ZUF0dGFjayA9ICh4LCB5KSA9PiB7XG5cdFx0aWYgKGJvYXJkQXJyYXlbeF1beV0gIT09ICcnKSB7XG5cdFx0XHRyZXR1cm4gYm9hcmRBcnJheVt4XVt5XS5oaXQoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bWlzc2VkSGl0cy5wdXNoKFt4LCB5XSk7XG5cdFx0fVxuXHR9O1xuXHRjb25zdCBtaXNzZWRIaXRzID0gW107XG5cdHJldHVybiB7IHBsYWNlU2hpcCwgcmVjZWl2ZUF0dGFjaywgYm9hcmRBcnJheSB9O1xufTtcblxuY29uc3QgY2FycmllciA9IHsgbGVuZ3RoOiA1LCBuYW1lOiAnY2FycmllcicgfTtcbmNvbnN0IGJhdHRsZXNoaXAgPSB7IGxlbmd0aDogNCwgbmFtZTogJ2JhdHRsZXNoaXAnIH07XG5jb25zdCBkZXN0cm95ZXIgPSB7IGxlbmd0aDogMywgbmFtZTogJ2Rlc3Ryb3llcicgfTtcbmNvbnN0IHN1Ym1hcmluZSA9IHsgbGVuZ3RoOiAzLCBuYW1lOiAnc3VibWFyaW5lJyB9O1xuY29uc3QgcGF0cm9sQm9hdCA9IHsgbGVuZ3RoOiAyLCBuYW1lOiAncGF0cm9sIGJvYXQnIH07XG5cbmNvbnN0IHBsYXllckJvYXJkID0gZ2FtZUJvYXJkKCk7XG5cbmV4cG9ydCB7IHNoaXAsIGdhbWVCb2FyZCB9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9