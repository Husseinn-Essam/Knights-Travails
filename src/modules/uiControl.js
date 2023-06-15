import chessBoard from './chessBoard'

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
let path;
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
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
  
    if (isSettingStart) {
      if (startPos) {
        // Remove active state from the previous start cell
        const prevStartCell = document.querySelector('.startCell');
        prevStartCell.classList.remove('startCell');
        const knightIcon = prevStartCell.querySelector('.fa-chess-knight');
        prevStartCell.classList.add((parseInt(prevStartCell.dataset.row) + parseInt(prevStartCell.dataset.col)) % 2 === 0 ? 'light' : 'dark');
        if(knightIcon){
          prevStartCell.removeChild(knightIcon);
        }
      }
  
      startPos = [row, col];
      cell.classList.add('startCell');
      cell.classList.remove('light', 'dark');
      // Create the knight element
      const knightIcon = document.createElement('i');
      knightIcon.classList.add('fa-solid', 'fa-chess-knight');
      knightIcon.style.display = 'none';
      cell.appendChild(knightIcon)
      moveKnightInitial();
      knightIcon.style.display = 'block';
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
  if (startPos && endPos) {
      path = chessBoard.getShortestPath(startPos, endPos);
      animateKnightPath(path);
    highlightPath();
  } else {
    console.log("Start and end positions not set.");
  }
}

function highlightPath() {
  for (let i = 0; i < path.length; i++) {
    const [row, col] = path[i];
    const cell = getCell(row, col);
    cell.classList.add('pathCell');
    //cell.textContent = i + 1;
  }
}

function handleClearButtonClick() {
startBool = false;
endBool = false;
startPos = null;
endPos = null;
clearPath();
}

function clearPath() {
  const pathCells = document.querySelectorAll('.pathCell');
  pathCells.forEach(cell => {
    cell.classList.remove('pathCell');
    cell.textContent = '';
  });
}

function getCell(row, col) {
  return document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
}

// Move knight to its starting cell , since its positioned absolutely to board;
function moveKnightInitial(){
  const knightElement = document.querySelector('.fa-chess-knight');
  let intialRow , initialCol;
  [intialRow,initialCol]= startPos;
  const cell = getCell(intialRow, initialCol);
  // calculate the translation values for the knight's movement
  const cellWidth = cell.offsetWidth;
  const cellHeight = cell.offsetHeight;
  const translateX = ((initialCol) * cellWidth) ;
  const translateY = ((intialRow) * cellHeight);
  
  // css transform
  //knightElement.style.transition = `transform ${delay / 1000}s`;
  knightElement.style.transform = `translate(${translateX}px, ${translateY}px)`;  

}
// animation script
function animateStep(index) {
  const knightElement = document.querySelector('.fa-chess-knight');
  const delay = 600; // Delay between each step of the animation 
  
  if (index >= (path.length)) {
    // Animation complete
    return;
  }
  
  let row, col;
  if (index === 0) {
    [row, col] = path[index + 1];
    index++;
  } else {
    [row, col] = path[index];
  }
  
  const cell = getCell(row, col);
  // calculate the translation values for the knight's movement
  const cellWidth = cell.offsetWidth;
  const cellHeight = cell.offsetHeight;
  const translateX = ((col) * cellWidth) ;
  const translateY = ((row) * cellHeight);
  
  // css transform
  knightElement.style.transition = `transform ${delay / 1000}s`;
  knightElement.style.transform = `translate(${translateX}px, ${translateY}px)`;
  
  
  // delay before animating the next step
  setTimeout(() => {
    animateStep(index + 1);
  }, delay);
  
  }
  
//the shortest path animation calls animationStep()
function animateKnightPath(path) {
  
  // Start the animation from the first step
  animateStep(0);
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
