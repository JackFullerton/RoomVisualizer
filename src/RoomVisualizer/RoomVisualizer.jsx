import React, {Component} from 'react';
import Node from './Node/Node';
import {neighbour} from '../algorithms/neighbour';
import './RoomVisualizer.css';

export default class RoomVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
  }
   
  animateRoom(grid) {
    var i = 1;
    var neighbours = [];
    for (const row of grid) {
      for (const node of row) {
        if(node.isPerson){
            neighbours = neighbour(node,grid);
            setTimeout(() => {
                const new_node = node;
                document.getElementById(`node-${new_node.row}-${new_node.col}`).className =
                  'node node-found';
                }, 15 * i);
        }else{
        setTimeout(() => {
        const new_node = node;
        document.getElementById(`node-${new_node.row}-${new_node.col}`).className =
          'node node-visited';
        }, 15 * i);
        }
        for(const node of neighbours){
           node.isNeighbour = true;
        }
        i++;
      }
    }
    // Ping here
    var secondNeighbours = [];
    for (const row of grid) {
        for (const node of row) {
            if(node.isNeighbour && !(node.isPerson)){
                secondNeighbours = neighbour(node,grid);
                for(const node of secondNeighbours){
                    node.isSecondNeighbour = true;
                 }
                setTimeout(() => {
                    const new_node = node;
                    document.getElementById(`node-${new_node.row}-${new_node.col}`).className =
                      'node node-neighbour';
                    }, 15 * i);
            }
        }
    }

    for (const row of grid) {
        for (const node of row) {
            if(node.isSecondNeighbour && !(node.isNeighbour) && !(node.isPerson)){
                setTimeout(() => {
                    const new_node = node;
                    document.getElementById(`node-${new_node.row}-${new_node.col}`).className =
                      'node node-second-neighbour';
                    }, 15 * i);
            }
        }
    }
  }



  visualizeRoom() {
    const {grid} = this.state;
    this.animateRoom(grid);
  }

  render() {
    const {grid, mouseIsPressed} = this.state;
    return (
      <>
        <button onClick={() => this.visualizeRoom()}>
          Visualize 
        </button>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isPerson} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isPerson={isPerson}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
   }
}
const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 17; row++) {
    const currentRow = [];
    for (let col = 0; col < 20; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};
const createNode = (col, row) => {
  return {
    col,
    row,
    isVisited: false,
    isPerson: false,
    isNeighbour: false,
    isSecondNeighbour: false,
    previousNode: null,
  };
};
const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isPerson: !node.isPerson,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

