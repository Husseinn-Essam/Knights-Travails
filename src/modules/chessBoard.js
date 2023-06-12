const Node = require('./node');
const Queue = require('./queue')

const moves = [
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
    [-2, -1],
    [-1, -2],
    [1, -2],
    [2, -1]
  ];


//check if we reached destination
function reachedDest(node,dx,dy)
{
    if(node.row == dx && node.col == dy){
        return true;
    }
    return false;
}


  
function getShortestPath([sx, sy], [dx, dy]) {
  const pathQ = new Queue();
  let startNode = new Node(sx, sy, 0);
  pathQ.enqueue(startNode);
  let prev = [...Array(8)].map(() => Array(8).fill(0));
  const visited = new Set();

  while (pathQ.size() > 0) {
    const curr = pathQ.dequeue();

    if (reachedDest(curr, dx, dy)) {
      return reconstructPath(prev, dx, dy, sx, sy);
    }

    for (let i = 0; i < 8; i++) {
      const newRow = curr.row + moves[i][0];
      const newCol = curr.col + moves[i][1];
      if (newRow < 8 && newCol < 8 && newRow >= 0 && newCol >= 0) {
        const neighbor = new Node(newRow, newCol, curr.distance + 1);
        if (visited.has(neighbor.getPosition())) continue;
        pathQ.enqueue(neighbor);
        visited.add(neighbor.getPosition());
        prev[newRow][newCol] = [curr.row, curr.col];
      }
    }
  }

  // No path found
  return [];
}

function reconstructPath(prevArr, dx, dy, sx, sy) {
  let currentLoc = [dx, dy];
  let path = [];
  while ((currentLoc[0] !== sx) || (currentLoc[1] !== sy)) {
    path.unshift(currentLoc);
    currentLoc = prevArr[currentLoc[0]][currentLoc[1]];
  }
  path.unshift([sx, sy]);
  return path;
}



module.exports = { getShortestPath };

