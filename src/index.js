import './styles/main.scss';
const chessBoard = require ('./modules/chessBoard')

import uiControl from './modules/uiControl';
uiControl.init();
console.log(chessBoard.getShortestPath([0, 0], [7, 7]))