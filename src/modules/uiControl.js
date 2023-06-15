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
      // make knight not display until we move it to initial location
      knightIcon.style.display = 'none';
      cell.appendChild(knightIcon)
      moveKnightInitial();
      knightIcon.style.display = 'block';
    } 
    else if (isSettingEnd) {
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
      animateKnightPath(path,0);
      highlightPath()  
    
  } else {
    console.log("Start and end positions not set.");
  }
}

function highlightPath() {
  for (let i = 0; i < path.length; i++) {
    const [row, col] = path[i];
    const cell = getCell(row, col);
    if(cell.classList.contains('startCell') || cell.classList.contains('endCell')) continue;
    cell.classList.add('pathCell');
    
  }
}

function enumeratePath(){
  for(let i = 1 ; i< path.length ; i++){
     const [row, col] = path[i];
     const cell = getCell(row, col);
     if(cell.classList.contains('pathCell')){
      cell.innerHTML = i;
   }
  }
}

function handleClearButtonClick() {
isSettingStart = false;
isSettingEnd = false;
startPos = null;
endPos = null;
clearPath();
}

function clearPath() {
  const pathCells = document.querySelectorAll('.cell');
  const knightElement = document.querySelector('.fa-chess-knight');

  pathCells.forEach(cell => {
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
  knightElement.style.transform = `translate(${translateX}px, ${translateY}px)`;  

}
// animation script
function animateKnightPath(path,index) {
  const knightElement = document.querySelector('.fa-chess-knight');
  const delay = 600; // Delay between each step of the animation 
  
  if (index >= (path.length)) {
    // Animation complete
    enumeratePath();
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
    animateKnightPath(path,index + 1);
  }, delay);
  
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
