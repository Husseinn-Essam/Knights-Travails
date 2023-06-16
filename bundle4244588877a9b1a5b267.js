/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/chessBoard.js":
/*!***********************************!*\
  !*** ./src/modules/chessBoard.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Node = __webpack_require__(/*! ./node */ "./src/modules/node.js");

var Queue = __webpack_require__(/*! ./queue */ "./src/modules/queue.js");

var ShortestPath = function () {
  var moves = [[2, 1], [1, 2], [-1, 2], [-2, 1], [-2, -1], [-1, -2], [1, -2], [2, -1]]; // Helper function to check if we reached the destination

  function reachedDest(node, dx, dy) {
    return node.row === dx && node.col === dy;
  }

  function getShortestPath(_ref, _ref2) {
    var _ref3 = _slicedToArray(_ref, 2),
        sx = _ref3[0],
        sy = _ref3[1];

    var _ref4 = _slicedToArray(_ref2, 2),
        dx = _ref4[0],
        dy = _ref4[1];

    var pathQ = new Queue();
    var startNode = new Node(sx, sy, 0);
    pathQ.enqueue(startNode);

    var prev = _toConsumableArray(Array(8)).map(function () {
      return Array(8).fill(0);
    });

    var visited = new Set();

    while (pathQ.size() > 0) {
      var curr = pathQ.dequeue();

      if (reachedDest(curr, dx, dy)) {
        return reconstructPath(prev, dx, dy, sx, sy);
      }

      for (var i = 0; i < 8; i++) {
        var newRow = curr.row + moves[i][0];
        var newCol = curr.col + moves[i][1];

        if (newRow < 8 && newCol < 8 && newRow >= 0 && newCol >= 0) {
          var neighbor = new Node(newRow, newCol, curr.distance + 1);
          if (visited.has(neighbor.getPosition())) continue;
          pathQ.enqueue(neighbor);
          visited.add(neighbor.getPosition());
          prev[newRow][newCol] = [curr.row, curr.col];
        }
      }
    } // No path found


    return [];
  }

  function reconstructPath(prevArr, dx, dy, sx, sy) {
    var currentLoc = [dx, dy];
    var path = [];

    while (currentLoc[0] !== sx || currentLoc[1] !== sy) {
      path.unshift(currentLoc);
      currentLoc = prevArr[currentLoc[0]][currentLoc[1]];
    }

    path.unshift([sx, sy]);
    return path;
  } // Expose the public methods


  return {
    getShortestPath: getShortestPath
  };
}();

module.exports = ShortestPath;

/***/ }),

/***/ "./src/modules/node.js":
/*!*****************************!*\
  !*** ./src/modules/node.js ***!
  \*****************************/
/***/ ((module) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var node = /*#__PURE__*/function () {
  function node(row, col, distance) {
    _classCallCheck(this, node);

    this.row = row;
    this.col = col;
    this.distance = distance;
  }

  _createClass(node, [{
    key: "getPosition",
    value: function getPosition() {
      return "".concat(this.row, ", ").concat(this.col);
    }
  }]);

  return node;
}();

module.exports = node;

/***/ }),

/***/ "./src/modules/queue.js":
/*!******************************!*\
  !*** ./src/modules/queue.js ***!
  \******************************/
/***/ ((module) => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Queue = /*#__PURE__*/function () {
  function Queue() {
    _classCallCheck(this, Queue);

    this.items = [];
  }

  _createClass(Queue, [{
    key: "enqueue",
    value: function enqueue(item) {
      this.items.push(item);
    }
  }, {
    key: "dequeue",
    value: function dequeue() {
      if (this.isEmpty()) {
        return null;
      }

      return this.items.shift();
    }
  }, {
    key: "front",
    value: function front() {
      if (this.isEmpty()) {
        return null;
      }

      return this.items[0];
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this.items.length === 0;
    }
  }, {
    key: "size",
    value: function size() {
      return this.items.length;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.items = [];
    }
  }]);

  return Queue;
}();

module.exports = Queue;

/***/ }),

/***/ "./src/modules/uiControl.js":
/*!**********************************!*\
  !*** ./src/modules/uiControl.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _chessBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chessBoard */ "./src/modules/chessBoard.js");
/* harmony import */ var _chessBoard__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_chessBoard__WEBPACK_IMPORTED_MODULE_0__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var uiControl = function () {
  var boardElement = document.getElementById("chessBoard");
  var startButton = document.getElementById("startButton");
  var endButton = document.getElementById("endButton");
  var travelButton = document.getElementById("travelButton");
  var clearButton = document.getElementById("clearButton");
  var isSettingStart = false;
  var isSettingEnd = false;
  var startPos;
  var endPos;
  var path;

  function createChessBoard() {
    for (var row = 0; row < 8; row++) {
      for (var col = 0; col < 8; col++) {
        var cell = document.createElement("div");
        cell.className = "cell";

        if ((row + col) % 2 === 0) {
          cell.classList.add('light');
        } else {
          cell.classList.add('dark');
        }

        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.addEventListener("click", handleCellClick);
        boardElement.appendChild(cell);
      }
    }
  }

  function handleCellClick(event) {
    var cell = event.target;
    var row = parseInt(cell.dataset.row);
    var col = parseInt(cell.dataset.col);

    if (isSettingStart) {
      if (startPos) {
        // Remove active state from the previous start cell
        var prevStartCell = document.querySelector('.startCell');

        if (prevStartCell) {
          prevStartCell.classList.remove('startCell');

          var _knightIcon = prevStartCell.querySelector('.fa-chess-knight');

          prevStartCell.classList.add((parseInt(prevStartCell.dataset.row) + parseInt(prevStartCell.dataset.col)) % 2 === 0 ? 'light' : 'dark');

          if (_knightIcon) {
            prevStartCell.removeChild(_knightIcon);
          }
        }
      }

      startPos = [row, col];
      cell.classList.add('startCell');
      cell.classList.remove('light', 'dark'); // Create the knight element

      var knightIcon = document.createElement('i');
      knightIcon.classList.add('fa-solid', 'fa-chess-knight'); // make knight not display until we move it to initial location

      knightIcon.style.display = 'none';
      cell.appendChild(knightIcon);
      moveKnightInitial();
      knightIcon.style.display = 'block';
    } else if (isSettingEnd) {
      if (endPos) {
        // Remove active state from the previous end cell
        var prevEndCell = document.querySelector('.endCell');

        if (prevEndCell) {
          prevEndCell.classList.remove('endCell');
          prevEndCell.classList.add((parseInt(prevEndCell.dataset.row) + parseInt(prevEndCell.dataset.col)) % 2 === 0 ? 'light' : 'dark');
        }
      }

      endPos = [row, col];
      cell.classList.add('endCell');
      cell.classList.remove('light', 'dark');
    } else {
      cell.classList.toggle('active');
    }

    console.log("Clicked cell: [".concat(row, ", ").concat(col, "]"));
  }

  function handleStartButtonClick() {
    // Code to handle start button click
    if (document.querySelector('.pathCell')) clearPath();
    isSettingEnd = false;
    isSettingStart = true;
  }

  function handleEndButtonClick() {
    // Code to handle end button click
    if (document.querySelector('.pathCell')) clearPath();
    isSettingStart = false;
    isSettingEnd = true;
  }

  function handleTravelButtonClick() {
    if (startPos && endPos) {
      isSettingEnd = false;
      isSettingStart = false;
      path = _chessBoard__WEBPACK_IMPORTED_MODULE_0___default().getShortestPath(startPos, endPos);
      animateKnightPath(path, 0);
      highlightPath();
    } else {
      console.log("Start and end positions not set.");
    }
  }

  function highlightPath() {
    for (var i = 0; i < path.length; i++) {
      var _path$i = _slicedToArray(path[i], 2),
          row = _path$i[0],
          col = _path$i[1];

      var cell = getCell(row, col);
      if (cell.classList.contains('startCell') || cell.classList.contains('endCell')) continue;
      cell.classList.add('pathCell');
    }
  }

  function enumeratePath() {
    for (var i = 1; i < path.length; i++) {
      var _path$i2 = _slicedToArray(path[i], 2),
          row = _path$i2[0],
          col = _path$i2[1];

      var cell = getCell(row, col);

      if (cell.classList.contains('pathCell')) {
        cell.innerHTML = i;
      }
    }
  }

  function handleClearButtonClick() {
    clearPath();
  }

  function clearPath() {
    var pathCells = document.querySelectorAll('.cell');
    var knightElement = document.querySelector('.fa-chess-knight');
    isSettingStart = false;
    isSettingEnd = false;
    startPos = null;
    endPos = null;
    pathCells.forEach(function (cell) {
      if (cell.classList.contains('pathCell')) {
        cell.classList.remove('pathCell');
        cell.textContent = '';
      }

      if (cell.classList.contains('startCell')) {
        cell.classList.remove('startCell');
        cell.classList.add((parseInt(cell.dataset.row) + parseInt(cell.dataset.col)) % 2 === 0 ? 'light' : 'dark');
      }

      if (cell.classList.contains('endCell')) {
        cell.classList.remove('endCell');
        cell.classList.add((parseInt(cell.dataset.row) + parseInt(cell.dataset.col)) % 2 === 0 ? 'light' : 'dark');
      }
    });

    if (knightElement) {
      knightElement.remove();
    }
  }

  function getCell(row, col) {
    return document.querySelector(".cell[data-row=\"".concat(row, "\"][data-col=\"").concat(col, "\"]"));
  } // Move knight to its starting cell , since its positioned absolutely to board;


  function moveKnightInitial() {
    var knightElement = document.querySelector('.fa-chess-knight');
    var intialRow, initialCol;
    var _startPos = startPos;

    var _startPos2 = _slicedToArray(_startPos, 2);

    intialRow = _startPos2[0];
    initialCol = _startPos2[1];
    var cell = getCell(intialRow, initialCol); // calculate the translation values for the knight's movement

    var cellWidth = cell.offsetWidth;
    var cellHeight = cell.offsetHeight;
    var translateX = initialCol * cellWidth;
    var translateY = intialRow * cellHeight; // css transform

    knightElement.style.transform = "translate(".concat(translateX, "px, ").concat(translateY, "px)");
  } // animation script


  function animateKnightPath(path, index) {
    var knightElement = document.querySelector('.fa-chess-knight');
    var delay = 600; // Delay between each step of the animation 

    if (index >= path.length) {
      // Animation complete
      enumeratePath();
      return;
    }

    var row, col;

    if (index === 0) {
      var _path = _slicedToArray(path[index + 1], 2);

      row = _path[0];
      col = _path[1];
      index++;
    } else {
      var _path$index = _slicedToArray(path[index], 2);

      row = _path$index[0];
      col = _path$index[1];
    }

    var cell = getCell(row, col); // calculate the translation values for the knight's movement

    var cellWidth = cell.offsetWidth;
    var cellHeight = cell.offsetHeight;
    var translateX = col * cellWidth;
    var translateY = row * cellHeight; // css transform

    knightElement.style.transition = "transform ".concat(delay / 1000, "s");
    knightElement.style.transform = "translate(".concat(translateX, "px, ").concat(translateY, "px)"); // delay before animating the next step

    setTimeout(function () {
      animateKnightPath(path, index + 1);
    }, delay);
  }

  return {
    init: function init() {
      createChessBoard();
      startButton.addEventListener("click", handleStartButtonClick);
      endButton.addEventListener("click", handleEndButtonClick);
      travelButton.addEventListener("click", handleTravelButtonClick);
      clearButton.addEventListener("click", handleClearButtonClick);
    }
  };
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (uiControl);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss ***!
  \***********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".toolbar {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 20px;\n}\n.toolbar h1 {\n  text-align: center;\n  color: #333333;\n  margin-bottom: 30px;\n  font-size: 40px;\n}\n\n.toolbar button {\n  display: block;\n  width: 150px;\n  padding: 10px;\n  margin-bottom: 10px;\n  border: none;\n  background-color: #4CAF50;\n  color: #fff;\n  font-size: 16px;\n  font-weight: bold;\n  text-align: center;\n  text-decoration: none;\n  border-radius: 5px;\n  cursor: pointer;\n}\n\n.toolbar button:hover {\n  background-color: #3f6212;\n}\n\n.toolbar button:active {\n  background-color: #21618c;\n}\n\n* {\n  margin: 0;\n  box-sizing: border-box;\n  font-family: \"Segoe UI\", Tahoma, Geneva, Verdana, sans-serif;\n}\n\nbody {\n  font-family: Arial, sans-serif;\n  background-color: #FFFFFF;\n  margin: 0;\n  padding: 0;\n  height: 100vh;\n}\n\n.container {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n  height: 100vh;\n  gap: 5rem;\n  overflow: scroll;\n}\n\n.board {\n  display: grid;\n  position: relative;\n  grid-template-columns: repeat(8, minmax(40px, 1fr));\n  grid-template-rows: repeat(8, minmax(40px, 1fr));\n  border: 2px solid #000;\n}\n\n.row {\n  display: flex;\n}\n\n.cell {\n  width: 70px;\n  height: 70px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 2rem;\n  font-weight: 700;\n}\n.cell:hover {\n  transition: opacity 0.3s ease;\n  opacity: 0.4;\n}\n.cell .fa-chess-knight {\n  position: absolute;\n  font-size: 50px;\n  top: 1.5%;\n  left: 1.8%;\n  transition: top 0.5s, left 0.5s;\n  z-index: 2;\n}\n\n.startCell {\n  background-color: #FFD700;\n}\n\n.endCell {\n  background-color: #F7AAB9;\n}\n\n.light {\n  background-color: #F0F0F0;\n}\n\n.dark {\n  background-color: #333333;\n}\n\n.pathCell {\n  background-color: #C3E6CB;\n}\n\n@media (max-width: 768px) {\n  /* Adjustments for smaller screens */\n  .cell {\n    width: auto;\n    height: auto;\n  }\n  .cell .fa-chess-knight {\n    font-size: 2rem;\n  }\n\n  .container {\n    flex-direction: column;\n    display: block;\n  }\n\n  .board {\n    width: min-content;\n    margin: 0 auto;\n  }\n}", "",{"version":3,"sources":["webpack://./src/styles/_toolbar.scss","webpack://./src/styles/main.scss","webpack://./src/styles/_colors.scss"],"names":[],"mappings":"AAEA;EACA,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,uBAAA;EACA,mBAAA;ACDA;ADEA;EACI,kBAAA;EACA,cELU;EFMV,mBAAA;EACA,eAAA;ACAJ;;ADIA;EACA,cAAA;EACA,YAAA;EACA,aAAA;EACA,mBAAA;EACA,YAAA;EACA,yBElBgB;EFmBhB,WAAA;EACA,eAAA;EACA,iBAAA;EACA,kBAAA;EACA,qBAAA;EACA,kBAAA;EACA,eAAA;ACDA;;ADIA;EACA,yBAAA;ACDA;;ADIA;EACA,yBAAA;ACDA;;AAlCA;EACE,SAAA;EACA,sBAAA;EACA,4DAAA;AAqCF;;AAnCA;EACI,8BAAA;EACA,yBCRe;EDSf,SAAA;EACA,UAAA;EACA,aAAA;AAsCJ;;AAnCE;EACE,aAAA;EACA,mBAAA;EACA,mBAAA;EACA,uBAAA;EACA,aAAA;EACA,SAAA;EACA,gBAAA;AAsCJ;;AAlCE;EACE,aAAA;EACA,kBAAA;EACA,mDAAA;EACA,gDAAA;EACA,sBAAA;AAqCJ;;AAlCE;EACE,aAAA;AAqCJ;;AAlCE;EACE,WAAA;EACA,YAAA;EACA,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,eAAA;EACA,gBAAA;AAqCJ;AApCI;EACI,6BAAA;EACA,YAAA;AAsCR;AApCI;EACE,kBAAA;EACA,eAAA;EACA,SAAA;EACA,UAAA;EACA,+BAAA;EACA,UAAA;AAsCN;;AAlCA;EACI,yBCtDsB;AD2F1B;;AAnCA;EACI,yBCvDqB;AD6FzB;;AApCA;EACE,yBCjEmB;ADwGrB;;AApCA;EACE,yBCpEkB;AD2GpB;;AArCA;EACE,yBC/DwB;ADuG1B;;AArCA;EACE,oCAAA;EACA;IACE,WAAA;IACA,YAAA;EAwCF;EAvCE;IACE,eAAA;EAyCJ;;EApCA;IACE,sBAAA;IACA,cAAA;EAuCF;;EApCA;IACE,kBAAA;IACA,cAAA;EAuCF;AACF","sourcesContent":["@import './colors';\r\n\r\n.toolbar {\r\ndisplay: flex;\r\nflex-direction: column;\r\nalign-items: center;\r\njustify-content: center;\r\nmargin-bottom: 20px;\r\nh1 {\r\n    text-align: center;\r\n    color: $color-title;\r\n    margin-bottom: 30px;\r\n    font-size: 40px;\r\n    }\r\n}\r\n\r\n.toolbar button {\r\ndisplay: block;\r\nwidth: 150px;\r\npadding: 10px;\r\nmargin-bottom: 10px;\r\nborder: none;\r\nbackground-color: $color-buttons;\r\ncolor: #fff;\r\nfont-size: 16px;\r\nfont-weight: bold;\r\ntext-align: center;\r\ntext-decoration: none;\r\nborder-radius: 5px;\r\ncursor: pointer;\r\n}\r\n\r\n.toolbar button:hover {\r\nbackground-color: #3f6212;\r\n}\r\n\r\n.toolbar button:active {\r\nbackground-color: #21618c;\r\n}","@import './toolbar';\r\n@import './colors';\r\n*{\r\n  margin: 0;\r\n  box-sizing: border-box;\r\n  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\r\n}\r\nbody {\r\n    font-family: Arial, sans-serif;\r\n    background-color: $color-background;\r\n    margin: 0;\r\n    padding: 0;\r\n    height: 100vh;\r\n  }\r\n  \r\n  .container {\r\n    display: flex;\r\n    flex-direction: row;\r\n    align-items: center;\r\n    justify-content: center;\r\n    height: 100vh;\r\n    gap: 5rem;\r\n    overflow: scroll;\r\n  }\r\n\r\n  \r\n  .board {\r\n    display: grid;\r\n    position: relative;\r\n    grid-template-columns: repeat(8,minmax(40px,1fr));\r\n    grid-template-rows: repeat(8,  minmax(40px,1fr));\r\n    border: 2px solid #000;\r\n  }\r\n  \r\n  .row {\r\n    display: flex;\r\n  }\r\n  \r\n  .cell {\r\n    width: 70px;\r\n    height: 70px;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n    font-size: 2rem;\r\n    font-weight: 700;\r\n    &:hover{\r\n        transition: opacity 0.3s ease;\r\n        opacity: 0.4;    \r\n    }\r\n    .fa-chess-knight{\r\n      position: absolute;\r\n      font-size: 50px;\r\n      top: 1.5%;\r\n      left: 1.8%;\r\n      transition: top 0.5s, left 0.5s; \r\n      z-index: 2;\r\n    }\r\n  }\r\n  \r\n.startCell{\r\n    background-color: $startCellBackgroundColor;\r\n}\r\n.endCell{\r\n    background-color: $endCellBackgroundColor;\r\n}\r\n.light {\r\n  background-color: $color-light-square;\r\n}\r\n\r\n.dark {\r\n  background-color: $color-dark-square;\r\n}\r\n.pathCell{\r\n  background-color: $pathCellBackgroundColor;\r\n}\r\n\r\n@media (max-width: 768px) {\r\n  /* Adjustments for smaller screens */\r\n  .cell {\r\n    width: auto;\r\n    height: auto;\r\n    .fa-chess-knight{\r\n      font-size: 2rem;\r\n  \r\n    }\r\n  }\r\n  \r\n  .container{\r\n    flex-direction: column;\r\n    display: block;\r\n  }\r\n  \r\n  .board{\r\n    width: min-content;\r\n    margin: 0 auto;\r\n  }\r\n}","// Color Palette\r\n$color-background: #FFFFFF;\r\n$color-light-square: #F0F0F0;\r\n$color-dark-square: #333333;\r\n$color-buttons: #4CAF50;\r\n$color-title: #333333;\r\n\r\n$startCellBackgroundColor:#FFD700 ;\r\n$startCellTextColor: #FFFFFF;\r\n$endCellBackgroundColor: #F7AAB9;\r\n$endCellTextColor: #000000;\r\n$pathCellBackgroundColor: #C3E6CB;\r\n$pathCellTextColor: #000000;\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles/main.scss":
/*!******************************!*\
  !*** ./src/styles/main.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./main.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/main.scss */ "./src/styles/main.scss");
/* harmony import */ var _modules_uiControl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/uiControl */ "./src/modules/uiControl.js");


var chessBoard = __webpack_require__(/*! ./modules/chessBoard */ "./src/modules/chessBoard.js");


_modules_uiControl__WEBPACK_IMPORTED_MODULE_1__["default"].init();
})();

/******/ })()
;
//# sourceMappingURL=bundle4244588877a9b1a5b267.js.map