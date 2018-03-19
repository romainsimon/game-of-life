const w = process.stdout.columns;
const h = process.stdout.rows;
const something = '█';
const nothing = ' ';
const lifeChance = process.argv[2] || Math.random();
if (lifeChance < 0 || lifeChance > 1)
  throw new Error('Life chance must be between 0 and 1');
let grid = [];
let init;

// Display the grid in terminal
const displayGrid = () => {
  let gridDisplay = '';
  for (let i=0; i<h; i++) {
    for (let j=0; j<w-1; j++)
      gridDisplay += grid[i][j] ? something : nothing;
    gridDisplay += '\n';
  }
  console.log(gridDisplay);
}

// Is a cell alive ?
const isAlive = (i, j) => {
  let nbNeighboors = grid[i][j-1] + grid[i][j+1];
  if (grid[i-1]) 
    nbNeighboors += grid[i-1][j-1] + grid[i-1][j] + grid[i-1][j+1];
  if (grid[i+1])
    nbNeighboors += grid[i+1][j-1] + grid[i+1][j] + grid[i+1][j+1];
  if (nbNeighboors === 3)
    return true;
  else if (nbNeighboors === 2)
    return grid[i][j];
  else
    return false;
}

// Evolve current grid
const evolveGrid = () => {
  newGrid = [];
  for (let i=0; i<h; i++) {
    newGrid.push([]);
    for (let j=0; j<w-1; j++) {
      let alive = init ? isAlive(i, j)
        : Math.random() > 1-lifeChance;
      newGrid[i].push(alive);
    }
  }
  grid = newGrid;
  init = true;
  displayGrid();
}

setInterval(() => evolveGrid(), 100);