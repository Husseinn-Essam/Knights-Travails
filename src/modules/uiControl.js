const uiControl = (function() {
    const boardElement = document.getElementById("chessBoard");
    const startButton = document.getElementById("startButton");
    const endButton = document.getElementById("endButton");
    const travelButton = document.getElementById("travelButton");
    const clearButton = document.getElementById("clearButton");
    let isSettingStart  = false;
    let isSettingEnd = false;
    let startPos;
    let endPos;
    function createChessBoard() {
        for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const cell = document.createElement("div");
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
        const cell = event.target;
        const row = cell.dataset.row;
        const col = cell.dataset.col;
      
        if (isSettingStart) {
          if (startPos) {
            // Remove active state from the previous start cell
            const prevStartCell = document.querySelector('.startCell');
            prevStartCell.classList.remove('startCell');
            prevStartCell.classList.add((parseInt(prevStartCell.dataset.row) + parseInt(prevStartCell.dataset.col)) % 2 === 0 ? 'light' : 'dark');
          }
      
          startPos = [row, col];
          cell.classList.add('startCell');
          cell.classList.remove('light', 'dark');
        } else if (isSettingEnd) {
          if (endPos) {
            // Remove active state from the previous end cell
            const prevEndCell = document.querySelector('.endCell');
            prevEndCell.classList.remove('endCell');
            prevEndCell.classList.add((parseInt(prevEndCell.dataset.row) + parseInt(prevEndCell.dataset.col)) % 2 === 0 ? 'light' : 'dark');
          }
      
          endPos = [row, col];
          cell.classList.add('endCell');
          cell.classList.remove('light', 'dark');
        } else {
          cell.classList.toggle('active');
        }
      
        console.log(`Clicked cell: [${row}, ${col}]`);
      }
                  
      

    function handleStartButtonClick() {
        // Code to handle start button click
        isSettingEnd= false;
        isSettingStart  = true;
    }

    function handleEndButtonClick() {
        // Code to handle end button click
        isSettingStart  = false;
        isSettingEnd = true
    }

    function handleTravelButtonClick() {
        // Code to handle travel button click
    }

    function handleClearButtonClick() {
        // Code to handle clear button click
    }

    return {
        init: function() {
        createChessBoard();
        startButton.addEventListener("click", handleStartButtonClick);
        endButton.addEventListener("click", handleEndButtonClick);
        travelButton.addEventListener("click", handleTravelButtonClick);
        clearButton.addEventListener("click", handleClearButtonClick);
        }
    };
})();

export default uiControl;
