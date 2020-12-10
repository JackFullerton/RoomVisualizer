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
    const newGrid = getNewGridWithPersonToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithPersonToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
  }
   
  animateRoom(grid,sim) {
    var i = 1;
    //primary neighbour and initial scan
    var primaryNeighbours = [];
    for (const row of grid) {
      for (const node of row) {
        if(node.isPerson){
          primaryNeighbours = neighbour(node,grid);
          setTimeout(() => {
              const new_node = node;
              document.getElementById(`node-${new_node.row}-${new_node.col}`).className =
                'node node-found';
              }, 2 * i);
        }
        else{
                const new_node = node;
                document.getElementById(`node-${new_node.row}-${new_node.col}`).className =
                'node node-visited';
        }
        for(const node of primaryNeighbours){
            node.isPrimaryNeighbour = true;
        }
      }
    }

    //secondary neighbour scan
    var secondaryNeighbours = [];
    for(const row of grid){
      for(const node of row){
        if(node.isPrimaryNeighbour){
          secondaryNeighbours = neighbour(node,grid);
          for(const node of secondaryNeighbours){
            node.isSecondaryNeighbour = true;
          }
        }
      }
    }

    //tertiary neighbour scan
    var tertiaryNeighbours = [];
    for(const row of grid){
      for(const node of row){
        if(node.isSecondaryNeighbour){
          tertiaryNeighbours = neighbour(node,grid);
          for(const node of tertiaryNeighbours){
            node.isTertiaryNeighbour = true;
          }
        }
      }
    }

     //edges scan
     var edgeNeighbours = [];
     for(const row of grid){
       for(const node of row){
         if(node.isTertiaryNeighbour){
           edgeNeighbours = neighbour(node,grid);
           for(const node of edgeNeighbours){
             node.isEdge = true;
           }
         }
       }
     }

     //spill over
     var spill = [];
     for(const row of grid){
       for(const node of row){
         if(node.isEdge){
           spill = neighbour(node,grid);
           for(const node of spill){
             node.isSpill = true;
           }
         }
       }
     }

    var new_grid = this.heatmapAssign(grid);

      this.heatmapColor(new_grid);
}

// Assign values here
heatmapAssign(grid){
    // assign random numbers for testing
    const newGrid = grid.slice();
    for(const row of grid){
      for(const old_node of row){
        var newNode = {
          ...old_node,
          value: this.getRandomRange(1,20),
        };
        if(old_node.isPrimaryNeighbour && !(old_node.isPerson)){
          newNode = {
            ...old_node,
            value: this.getRandomRange(80,90),
          };
        }
        if(old_node.isSecondaryNeighbour && !(old_node.isPerson) && !(old_node.isPrimaryNeighbour)){
          newNode = {
            ...old_node,
            value: this.getRandomRange(67,80),
          };
        }
        if(old_node.isTertiaryNeighbour && !(old_node.isPerson) && !(old_node.isPrimaryNeighbour)&&!(old_node.isSecondaryNeighbour)){
          newNode = {
            ...old_node,
            value: this.getRandomRange(45,55),
          };
        }
        if(old_node.isEdge && !(old_node.isPerson) && !(old_node.isPrimaryNeighbour)&&!(old_node.isSecondaryNeighbour)&&!(old_node.isTertiaryNeighbour)){
          newNode = {
            ...old_node,
            value: this.getRandomRange(35,40),
          };
        }
        if(old_node.isSpill && !(old_node.isPerson) && !(old_node.isPrimaryNeighbour)&&!(old_node.isSecondaryNeighbour)&&!(old_node.isTertiaryNeighbour)&&!(old_node.isEdge)){
          newNode = {
            ...old_node,
            value: this.getRandomRange(30,35),
          };
        }
        if(old_node.isPerson){
            newNode = {
              ...old_node,
              value:  95,
        
            }
        };
        
        newGrid[old_node.row][old_node.col] = newNode;
      }
    }
    return newGrid;
}

getRandomRange(min,max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Color nodes based on values
heatmapColor(grid){
    var i = 0;
    for(const row of grid){
        for(const node of row){
            var value = node.value;
            
            // Assign colors
            if(value<5){
                setTimeout(() => {
                    const new_node = node;
                    document.getElementById(`node-${new_node.row}-${new_node.col}`).className =
                    'node node-5';
                }, 2 * i);
            }
            if(value<10 && value>=5){
                setTimeout(() => {
                    const new_node = node;
                    document.getElementById(`node-${new_node.row}-${new_node.col}`).className =
                    'node node-10';
                }, 2 * i);
            }
            if(value<15&& value>=10){
                setTimeout(() => {
                    const new_node = node;
                    document.getElementById(`node-${new_node.row}-${new_node.col}`).className =
                    'node node-15';
                }, 2 * i);
            }
            if(value<20&& value>=15){
                setTimeout(() => {
                    const new_node = node;
                    document.getElementById(`node-${new_node.row}-${new_node.col}`).className =
                    'node node-20';
                }, 2 * i);
            }
            if(value<25&& value>=20){
                setTimeout(() => {
                    const new_node = node;
                    document.getElementById(`node-${new_node.row}-${new_node.col}`).className =
                    'node node-25';
                }, 2 * i);
            }
            if(value<30&& value>=25){
                setTimeout(() => {
                    const new_node = node;
                    document.getElementById(`node-${new_node.row}-${new_node.col}`).className =
                    'node node-30';
                }, 2 * i);
            }
            if(value<35&& value>=30){
                setTimeout(() => {
                    const new_node = node;
                    document.getElementById(`node-${new_node.row}-${new_node.col}`).className =
                    'node node-35';
                }, 2 * i);
            }
            if(value<40&& value>=35){
                setTimeout(() => {
                    const new_node = node;
                    document.getElementById(`node-${new_node.row}-${new_node.col}`).className =
                    'node node-40';
                }, 2 * i);
            }
            if(value<45&& value>=40){
                setTimeout(() => {
                    const new_node = node;
                    document.getElementById(`node-${new_node.row}-${new_node.col}`).className =
                    'node node-45';
                }, 2 * i);
            }
            if(value<50&& value>=45){
                setTimeout(() => {
                    const new_node = node;
                    document.getElementById(`node-${new_node.row}-${new_node.col}`).className =
                    'node node-50';
                }, 2 * i);
            }
            if(value<55&& value>=50){
                setTimeout(() => {
                    const new_node = node;
                    document.getElementById(`node-${new_node.row}-${new_node.col}`).className =
                    'node node-55';
                }, 2 * i);
            }
            if(value<60&& value>=55){
                setTimeout(() => {
                    const new_node = node;
                    document.getElementById(`node-${new_node.row}-${new_node.col}`).className =
                    'node node-60';
                }, 2 * i);
            }
            if(value<65 && value>=60){
                setTimeout(() => {
                    const new_node = node;
                    document.getElementById(`node-${new_node.row}-${new_node.col}`).className =
                    'node node-65';
                }, 2 * i);
            }
            if(value<70&& value>=65){
                setTimeout(() => {
                    const new_node = node;
                    document.getElementById(`node-${new_node.row}-${new_node.col}`).className =
                    'node node-70';
                }, 2 * i);
            }
            if(value<75&& value>=70){
                setTimeout(() => {
                    const new_node = node;
                    document.getElementById(`node-${new_node.row}-${new_node.col}`).className =
                    'node node-75';
                }, 2 * i);
            }
            if(value<80&& value>=75){
                setTimeout(() => {
                    const new_node = node;
                    document.getElementById(`node-${new_node.row}-${new_node.col}`).className =
                    'node node-80';
                }, 2 * i);
            }
            if(value<85&& value>=80){
                setTimeout(() => {
                    const new_node = node;
                    document.getElementById(`node-${new_node.row}-${new_node.col}`).className =
                    'node node-85';
                }, 2 * i);
            }
            if(value<90&& value>=85){
                setTimeout(() => {
                    const new_node = node;
                    document.getElementById(`node-${new_node.row}-${new_node.col}`).className =
                    'node node-90';
                }, 2 * i);
            }
            if(value<95&& value>=90){
                setTimeout(() => {
                    const new_node = node;
                    document.getElementById(`node-${new_node.row}-${new_node.col}`).className =
                    'node node-95';
                }, 2 * i);
            }
            if(value<=100&& value>=95){
                setTimeout(() => {
                    const new_node = node;
                    document.getElementById(`node-${new_node.row}-${new_node.col}`).className =
                    'node node-100';
                }, 2 * i);
            }
            i++;
        }
    }
}

  visualizeRoom() {
    const {grid} = this.state;
    this.animateRoom(grid);
  }

  organizeRoom(){
    const {grid} = this.state;
    const new_grid = grid.slice();
    // 4 people
    const node1 = grid[35][7];
    const newNode1 = {
      ...node1,
      isPerson: !node1.isPerson,
    };
    const node2 = grid[35][19];
    const newNode2 = {
      ...node2,
      isPerson: !node2.isPerson,
    };
    const node3 = grid[31][4];
    const newNode3 = {
      ...node3,
      isPerson: !node3.isPerson,
    };
    const node4 = grid[31][15];
    const newNode4 = {
      ...node4,
      isPerson: !node4.isPerson,
    };
    new_grid[35][7] = newNode1;
    new_grid[35][19] = newNode2;
    new_grid[31][4] = newNode3;
    new_grid[31][15] = newNode4;
    this.setState({grid: new_grid});
  }

  simulateNeighbours(grid,personRow,personCol,delay){

        const personNode = grid[personRow][personCol];
        var primaryNeighbours = neighbour(personNode,grid);

        for(const node of primaryNeighbours){
          node.isPrimaryNeighbour = true;
          setTimeout(() => {
            document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-80w';
          },delay);
        }
    
    
        //secondary neighbour scan
        var secondaryNeighbours = [];
        for(const row of grid){
          for(const node of row){
            if(node.isPrimaryNeighbour){
              secondaryNeighbours = neighbour(node,grid);
              for(const secondaryNode of secondaryNeighbours){
                secondaryNode.isSecondaryNeighbour = true;
                setTimeout(() => {
                  document.getElementById(`node-${secondaryNode.row}-${secondaryNode.col}`).className =
                  'node node-75w';
                },delay);
              }
            }
          }
        }
        var tertiaryNeighbours = [];
        for(const row of grid){
          for(const node of row){
            if(node.isSecondaryNeighbour){
              tertiaryNeighbours = neighbour(node,grid);
              for(const tertiaryNode of tertiaryNeighbours){
                tertiaryNode.isTertiaryNeighbour = true;
                setTimeout(() => {
                  document.getElementById(`node-${tertiaryNode.row}-${tertiaryNode.col}`).className =
                  'node node-65w';
                },delay);
              }
            }
          }
        }
         var edgeNeighbours = [];
         for(const row of grid){
           for(const node of row){
             if(node.isTertiaryNeighbour){
               edgeNeighbours = neighbour(node,grid);
               for(const edgeNode of edgeNeighbours){
                 edgeNode.isEdge = true;
                setTimeout(() => {
                  document.getElementById(`node-${edgeNode.row}-${edgeNode.col}`).className =
                  'node node-45w';
                },delay);
               }
             }
           }
         }
         /*
         var spill = [];
         for(const row of grid){
           for(const node of row){
             if(node.isEdge){
               spill = neighbour(node,grid);
               for(const spillNode of spill){
                 spillNode.isSpill = true;
                 const {spillCol,spillRow} = spillNode;
                setTimeout(() => {
                  document.getElementById(`node-${spillCol}-${spillRow}`).className =
                  'node node-35w';
                },delay);
               }
             }
           }
         }
         */
  }

  resetNeighbours(grid,personRow,personCol,kill){
    const personNode = grid[personRow][personCol];

     var edgeNeighbours = [];
     for(const row of grid){
       for(const node of row){
         if(node.isTertiaryNeighbour){
           edgeNeighbours = neighbour(node,grid);
           for(const edgeNode of edgeNeighbours){
             //edgeNode.isEdge = false;
             if(kill){
              document.getElementById(`node-${edgeNode.row}-${edgeNode.col}`).className =
              'node node-15w';
              edgeNode.isEdge = false;
             }else{
              document.getElementById(`node-${edgeNode.row}-${edgeNode.col}`).className =
              'node node-35w';
             }
           }
         }
       }
     }
     var tertiaryNeighbours = [];
     for(const row of grid){
       for(const node of row){
         if(node.isSecondaryNeighbour){
           tertiaryNeighbours = neighbour(node,grid);
           for(const tertiaryNode of tertiaryNeighbours){
             //tertiaryNode.isTertiaryNeighbour = false;
             if(kill){
              document.getElementById(`node-${tertiaryNode.row}-${tertiaryNode.col}`).className =
              'node node-15w';
              tertiaryNode.isTertiaryNeighbour = false;
             }else{
               document.getElementById(`node-${tertiaryNode.row}-${tertiaryNode.col}`).className =
               'node node-35w';
             }
           }
         }
       }
     }
     var secondaryNeighbours = [];
     for(const row of grid){
       for(const node of row){
         if(node.isPrimaryNeighbour){
           secondaryNeighbours = neighbour(node,grid);
           for(const secondaryNode of secondaryNeighbours){
            // secondaryNode.isSecondaryNeighbour = false;
             if(kill){
              document.getElementById(`node-${secondaryNode.row}-${secondaryNode.col}`).className =
              'node node-15w';
              secondaryNode.isSecondaryNeighbour = false;
             }else{
               document.getElementById(`node-${secondaryNode.row}-${secondaryNode.col}`).className =
               'node node-35w';
             }
           }
         }
       }
     }
     var primaryNeighbours = neighbour(personNode,grid);

     for(const node of primaryNeighbours){
       //node.isPrimaryNeighbour = false;
        if(kill){
          node.isPrimaryNeighbour = false;
          document.getElementById(`node-${node.row}-${node.col}`).className =
         'node node-15w';
        }else{
         document.getElementById(`node-${node.row}-${node.col}`).className =
         'node node-35w';
        }
     }
     /*
     var spill = [];
     for(const row of grid){
       for(const node of row){
         if(node.isEdge){
           spill = neighbour(node,grid);
           for(const node of spill){
             node.isSpill = false;
             const {col,row} = node;
            setTimeout(() => {
              document.getElementById(`node-${row}-${col}`).className =
              'node node-35w';
            },delay);
           }
         }
       }
     }
     */
  }

  resetRoom(){
    window.location.reload(false);
  }

  simulateRoom(){
    // set up initial board with static people 
    var {grid} = this.state;
    const new_grid = grid.slice();
    // 4 people
    const node1 = grid[35][7];
    const newNode1 = {
      ...node1,
      isPerson: !node1.isPerson,
    };
    const node2 = grid[35][19];
    const newNode2 = {
      ...node2,
      isPerson: !node2.isPerson,
    };
    const node3 = grid[31][4];
    const newNode3 = {
      ...node3,
      isPerson: !node3.isPerson,
    };
    const node4 = grid[31][15];
    const newNode4 = {
      ...node4,
      isPerson: !node4.isPerson,
    };
    const node5 = grid[29][31];
    const newNode5 = {
      ...node5,
      isPerson: !node5.isPerson,
    };
    const node6 = grid[4][25];
    const newNode6 = {
      ...node6,
      isPerson: !node5.isPerson,
    };
    const node7 = grid[4][11];
    const newNode7 = {
      ...node7,
      isPerson: !node5.isPerson,
    };
    const node8 = grid[29][31];
    const newNode8 = {
      ...node8,
      isPerson: !node5.isPerson,
    };
    new_grid[35][7] = newNode1;
    new_grid[35][19] = newNode2;
    new_grid[31][4] = newNode3;
    new_grid[31][15] = newNode4;
    new_grid[29][31] = newNode5;
    new_grid[4][25] = newNode6;
    new_grid[4][11] = newNode7;
    this.setState({grid: new_grid});

    this.animateRoom(grid);
    // START 
    setTimeout(() => {
      document.getElementById(`node-${16}-${0}`).className =
      'node node-100';
      this.simulateNeighbours(grid,16,0,0);
    },9000);

    // RIGHT MOVE
    setTimeout(() => {
      //document.getElementById(`node-${16}-${0}`).className =
      //'node node-35w';
     this.resetNeighbours(grid,16,0,false);
     this.simulateNeighbours(grid,16,2,0);
    },10000);

    setTimeout(() => {
      document.getElementById(`node-${16}-${2}`).className =
      'node node-100w';
      this.resetNeighbours(grid,16,0,true);
      this.resetNeighbours(grid,16,2,false);
      this.simulateNeighbours(grid,16,4,0);
    },11000);
    setTimeout(() => {
      document.getElementById(`node-${16}-${4}`).className =
      'node node-100w';
      this.resetNeighbours(grid,16,2,true);
      this.resetNeighbours(grid,16,4,false);
      this.simulateNeighbours(grid,16,6,0);
    },12000);

    //DIAG RIGHT
    setTimeout(() => {
      document.getElementById(`node-${16}-${6}`).className =
      'node node-100w';
      this.resetNeighbours(grid,16,4,true);
      this.resetNeighbours(grid,16,6,true);
      this.simulateNeighbours(grid,14,12,0);
    },13000);

    //LEFT MOVE
    setTimeout(() => {
      document.getElementById(`node-${14}-${12}`).className =
      'node node-100w';
      this.resetNeighbours(grid,16,6,true);
      this.resetNeighbours(grid,14,12,false);
      this.simulateNeighbours(grid,14,14,0);
    },14000);
    setTimeout(() => {
      document.getElementById(`node-${14}-${14}`).className =
      'node node-100w';
      this.resetNeighbours(grid,14,12,true);
      this.resetNeighbours(grid,14,14,false);
      this.simulateNeighbours(grid,14,16,0);
    },15000);
    setTimeout(() => {
      document.getElementById(`node-${14}-${16}`).className =
      'node node-100w';
      this.resetNeighbours(grid,14,14,true);
      this.resetNeighbours(grid,14,16,false);
      this.simulateNeighbours(grid,14,18,0);
    },16000);
    setTimeout(() => {
      document.getElementById(`node-${14}-${18}`).className =
      'node node-100w';
      this.resetNeighbours(grid,14,16,true);
      this.resetNeighbours(grid,14,18,false);
      this.simulateNeighbours(grid,14,20,0);
    },17000);
    setTimeout(() => {
      document.getElementById(`node-${14}-${20}`).className =
      'node node-100w';
      this.resetNeighbours(grid,14,18,true);
      this.resetNeighbours(grid,14,20,false);
      this.simulateNeighbours(grid,14,22,0);
    },18000);
    setTimeout(() => {
      document.getElementById(`node-${14}-${22}`).className =
      'node node-100w';
      this.resetNeighbours(grid,14,20,true);
      this.resetNeighbours(grid,14,22,false);
      this.simulateNeighbours(grid,14,24,0);
    },19000);
    setTimeout(() => {
      document.getElementById(`node-${14}-${24}`).className =
      'node node-100w';
      this.resetNeighbours(grid,14,22,true);
      this.resetNeighbours(grid,14,24,false);
      this.simulateNeighbours(grid,14,26,0);
    },20000);
    setTimeout(() => {
      document.getElementById(`node-${14}-${26}`).className =
      'node node-100w';
      this.resetNeighbours(grid,14,24,true);
      this.resetNeighbours(grid,14,26,false);
      this.simulateNeighbours(grid,14,28,0);
    },21000);
    setTimeout(() => {
      document.getElementById(`node-${14}-${28}`).className =
      'node node-100';
      this.resetNeighbours(grid,14,26,true);
      this.resetNeighbours(grid,14,28,false);
      this.simulateNeighbours(grid,14,30,0);
    },22000);
    setTimeout(() => {
      document.getElementById(`node-${14}-${30}`).className =
      'node node-100';
      this.resetNeighbours(grid,14,28,true);
      this.resetNeighbours(grid,14,30,false);
      this.simulateNeighbours(grid,14,32,0);
    },23000);

    //Up
    setTimeout(() => {
      document.getElementById(`node-${14}-${32}`).className =
      'node node-100';
      this.resetNeighbours(grid,14,30,true);
      this.resetNeighbours(grid,14,32,true);
      this.simulateNeighbours(grid,12,34,0);
    },24000);
    setTimeout(() => {
      document.getElementById(`node-${12}-${34}`).className =
      'node node-100';
      //this.resetNeighbours(grid,16,6,true);
      this.resetNeighbours(grid,12,34,false);
      this.simulateNeighbours(grid,10,34,0);
    },25000);
    setTimeout(() => {
      document.getElementById(`node-${10}-${34}`).className =
      'node node-100';
      this.resetNeighbours(grid,12,34,true);
      this.resetNeighbours(grid,10,34,false);
      this.simulateNeighbours(grid,8,34,0);
    },26000);
    setTimeout(() => {
      document.getElementById(`node-${8}-${34}`).className =
      'node node-100';
      this.resetNeighbours(grid,10,34,true);
      this.resetNeighbours(grid,8,34,false);
      this.simulateNeighbours(grid,6,34,0);
    },27000);

    //Back down
    setTimeout(() => {
      document.getElementById(`node-${6}-${34}`).className =
      'node node-100';
      this.resetNeighbours(grid,8,34,true);
      this.resetNeighbours(grid,6,34,false);
      this.simulateNeighbours(grid,8,34,0);
    },31000);
    setTimeout(() => {
      document.getElementById(`node-${8}-${34}`).className =
      'node node-100';
      this.resetNeighbours(grid,6,34,true);
      this.resetNeighbours(grid,8,34,false);
      this.simulateNeighbours(grid,10,34,0);
    },32000);  
    setTimeout(() => {
      document.getElementById(`node-${10}-${34}`).className =
      'node node-100';
      this.resetNeighbours(grid,8,34,true);
      this.resetNeighbours(grid,10,34,false);
      this.simulateNeighbours(grid,12,34,0);
    },33000);
    setTimeout(() => {
      document.getElementById(`node-${12}-${34}`).className =
      'node node-100';
      this.resetNeighbours(grid,10,34,true);
      this.resetNeighbours(grid,12,34,false);
      this.simulateNeighbours(grid,14,34,0);
    },34000);

    //Down diag
    setTimeout(() => {
      document.getElementById(`node-${14}-${34}`).className =
      'node node-100';
      this.resetNeighbours(grid,12,34,true);
      this.resetNeighbours(grid,14,34,false);
      this.simulateNeighbours(grid,16,32,0);
    },35000);
    setTimeout(() => {
      document.getElementById(`node-${16}-${32}`).className =
      'node node-100';
      this.resetNeighbours(grid,14,34,true);
      this.resetNeighbours(grid,16,32,false);
      this.simulateNeighbours(grid,18,30,0);
    },36000);
    setTimeout(() => {
      document.getElementById(`node-${18}-${30}`).className =
      'node node-100';
      this.resetNeighbours(grid,16,32,true);
      this.resetNeighbours(grid,18,30,false);
      this.simulateNeighbours(grid,20,28,0);
    },37000);

    //Left
    setTimeout(() => {
      document.getElementById(`node-${20}-${28}`).className =
      'node node-100';
      this.resetNeighbours(grid,18,30,true);
      this.resetNeighbours(grid,20,28,false);
      this.simulateNeighbours(grid,20,26,0);
    },38000);
    setTimeout(() => {
      document.getElementById(`node-${20}-${26}`).className =
      'node node-100';
      this.resetNeighbours(grid,20,28,true);
      this.resetNeighbours(grid,20,26,false);
      this.simulateNeighbours(grid,20,24,0);
    },39000);
    setTimeout(() => {
      document.getElementById(`node-${20}-${24}`).className =
      'node node-100';
      this.resetNeighbours(grid,20,26,true);
      this.resetNeighbours(grid,20,24,false);
      this.simulateNeighbours(grid,20,22,0);
    },40000);
    setTimeout(() => {
      document.getElementById(`node-${20}-${22}`).className =
      'node node-100';
      this.resetNeighbours(grid,20,24,true);
      this.resetNeighbours(grid,20,22,false);
      this.simulateNeighbours(grid,20,20,0);
    },41000);

    //Down
    setTimeout(() => {
      document.getElementById(`node-${20}-${20}`).className =
      'node node-100';
      this.resetNeighbours(grid,20,22,true);
      this.resetNeighbours(grid,20,20,false);
      this.simulateNeighbours(grid,22,20,0);
    },42000);
    setTimeout(() => {
      document.getElementById(`node-${22}-${20}`).className =
      'node node-100';
      this.resetNeighbours(grid,20,20,true);
      this.resetNeighbours(grid,22,20,false);
      this.simulateNeighbours(grid,24,20,0);
    },43000);
    setTimeout(() => {
      document.getElementById(`node-${24}-${20}`).className =
      'node node-100';
      this.resetNeighbours(grid,22,20,true);
      this.resetNeighbours(grid,24,20,false);
      this.simulateNeighbours(grid,26,20,0);
    },44000);
    setTimeout(() => {
      document.getElementById(`node-${26}-${20}`).className =
      'node node-100';
      this.resetNeighbours(grid,24,20,true);
      this.resetNeighbours(grid,26,20,false);
      this.simulateNeighbours(grid,28,20,0);
    },45000);
    setTimeout(() => {
      document.getElementById(`node-${28}-${20}`).className =
      'node node-100';
      this.resetNeighbours(grid,26,20,true);
      this.resetNeighbours(grid,28,20,false);
      this.simulateNeighbours(grid,30,20,0);
    },46000);

}
  
  
  render() {
    const {grid, mouseIsPressed} = this.state;
    return (
      <>
        <ul>
        <li><button className='visualize-button' title="Reset the room grid" onClick={() => this.resetRoom()}>
          Reset Room
        </button></li>
        <li><button className='visualize-button' title="Organizes room to best utilize space and minimize close contact if specifed" onClick={() => this.organizeRoom()}>
          Organize Room
        </button></li>
        <li><button className='visualize-button' title="Visualize a realtime heatmap of the room" onClick={() => this.simulateRoom()}>
          Live Simulation
        </button></li>
        <li><button className='visualize-button' title="Visualize a snapshot of current room heatmap" onClick={() => this.visualizeRoom()}>
          Visualize 
        </button></li>
        </ul>
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
  for (let row = 0; row < 36; row++) {
    const currentRow = [];
    for (let col = 0; col < 64; col++) {
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
    value: 0,
    isVisited: false,
    isPerson: false,
    isPrimaryNeighbour: false,
    isSecondaryNeighbour: false,
    isTertiaryNeighbour: false,
    isEdge: false,
    isSpill: false,
    previousNode: null,
  };
};
const getNewGridWithPersonToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isPerson: !node.isPerson,
    value: 100,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

