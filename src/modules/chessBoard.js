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

function getNeighbor(curr)
{
    
}  

//check if we reached destination
function reachedDest(node,dx,dy)
{
    if(node.row == dx && node.col == dy){
        return true;
    }
    return false;
}

function getShortestPath([sx,sy],[dx,dy]){
    const pathQ = new Queue();
    let startNode = new Node(sx,sy,0);
    pathQ.enqueue(startNode);
    const visited = new Set();
    while (pathQ.size() > 0){
        const curr = pathQ.dequeue();
        //process node
        if(reachedDest(curr,dx,dy))
        {
            return curr.distance;
        }
        //getting neighbors
        for(let i = 0; i<8 ; i++ ){
            const newRow = curr.row + moves[i][0];
            const newCol = curr.col + moves[i][1];
            if (newRow < 7 && newCol < 7 && newRow > 0 && newCol > 0) {
                const neighbor = new Node(newRow,newCol,(curr.distance)+1);
                if(visited.has(neighbor.getPosition())) continue
                pathQ.enqueue(neighbor);                
            }

        }
          

    }
}

console.log(getShortestPath([3,3],[4,3]));

