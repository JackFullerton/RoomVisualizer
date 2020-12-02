//Get neighbours of people
export function neighbour(node,grid){
    const neighbours = [];
    const {col,row} = node;
    
    if(row > 0) neighbours.push(grid[row-1][col]);
    if (row < grid.length - 1) neighbours.push(grid[row + 1][col]);
    if (col > 0) neighbours.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1]);
    return neighbours;
}