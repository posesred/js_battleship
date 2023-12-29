import readline from "readline-sync";

const variableNum = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  I: 9,
  J: 10,
};

const findKeyByValue = (obj, target) => {
  for (const [key, value] of Object.entries(variableNum)) {
    if (value == target) {
      return key;
    }
  }
};

  export const makeGrid = (number) => {
  const grid = [];
  let num = 0;
  let num2 = 1;
  for (let i = 0; i < number; i++) {
    const rows = [];
    num++;
    for (let j = 0; j < number; j++) {
      rows.push(`${findKeyByValue(variableNum, num)}${num2}`);
      num2++;
    }
    num2 = 1;
    grid.push(rows);
  }
  return grid;
};

  export function display(board) {
  for (let i = 0; i < board.length; i++) {
    let rowString = "";
    for (let j = 0; j < board[i].length; j++) {
      rowString += board[i][j];
      if (j < board[i].length - 1) {
        rowString += " ";
      }
    }
    console.log(rowString);
  }
  console.log("_______________________________");
}

function getRandomPosition(grid, gridSize, shipLength) {
  const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
  let row, col;

  if (orientation == 'horizontal') {
    do {
      row = Math.floor(Math.random() * gridSize);
      col = Math.floor(Math.random() * (gridSize - shipLength + 1));
    } while (shipOccupied(grid, row, col, shipLength, orientation));
  } else {
    do {
      row = Math.floor(Math.random() * (gridSize - shipLength + 1));
      col = Math.floor(Math.random() * gridSize);
    } while (shipOccupied(grid, row, col, shipLength, orientation));
  }

  return { row, col, orientation };
}


function shipOccupied(grid, row, col, shipLength, orientation) {
  for (let i = 0; i < shipLength; i++) {
    if (orientation == 'horizontal' && grid[row][col + i] === 'Ship') {//keep the row and change col to check if there is already a ship like A1 A2 A3 A4
      return true;
    } else if (orientation == 'vertical' && grid[row + i][col] === 'Ship') {
      return true;
    }
  }
  return false;
}


function placeShip(grid, shipLength) {
  const position = getRandomPosition(grid,grid.length, shipLength);
  const { row, col, orientation } = position;

  let shipPositions = [];
  for (let i = 0; i < shipLength; i++) {
    if (orientation == 'horizontal') {
      grid[row][col + i] = 'Ship';
      shipPositions.push(`${findKeyByValue(variableNum, row + 1)}${col + i + 1}`);
    } else {
      grid[row + i][col] = 'Ship';
      shipPositions.push(`${findKeyByValue(variableNum, row + i + 1)}${col + 1}`);
    }
  }

  console.log(`Placing ship of length ${shipLength} at positions: ${shipPositions.join('-')}`);
}


let playAgain = true;

while (playAgain) {
  readline.keyInPause("Press any key to start!");

  const ships = [2,3,3,4,5];
  const grid10 = makeGrid(10);

  ships.forEach((shipLength)=>{
    placeShip(grid10,shipLength);
  });
  let remainingShipsParts = ships.reduce((sum,length)=>sum+length,0);
  let location = [];
  while (remainingShipsParts > 0) {
    display(grid10);
    
    let target = readline.question("Enter a location to Strike ie 'A2'");

    if (!location.includes(target)) {
      location.push(target);
      let gridValue = grid10[variableNum[target[0].toUpperCase()] - 1][parseInt(target.slice(1)) - 1];
      if (gridValue === "Ship") {
        remainingShipsParts--;
        console.log(`Hit. You have sunk a battleship. ${remainingShipsParts} ship parts remaining.`);
        if (remainingShipsParts === 0) {
          console.log("You have destroyed all battleships.");
      }
      } else {
        console.log("Miss. Try again.");
      }
    } else {
      console.log("You have already picked this location. Miss!");
    }
  }

  let playAgainInput = readline.question(
    "Would you like to play again? (Y/N): "
  );
  playAgain = playAgainInput.toUpperCase() === "Y";
}
