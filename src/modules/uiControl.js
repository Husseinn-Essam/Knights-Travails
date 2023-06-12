const uiControl = (function() {
const boardElement = document.getElementById("chessBoard");

function createChessBoard() {
    for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.addEventListener("click", handleCellClick);
        boardElement.appendChild(cell);
    }
    }
}

function handleCellClick(event) {
    const cell = event.target;
    const row = cell.dataset.row;
    const col = cell.dataset.col;

    console.log(`Clicked cell: [${row}, ${col}]`);
}

return {
    init: function() {
    createChessBoard();
    }
};
})();

export default uiControl;
