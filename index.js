var readline = require("readline-sync");

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

const makeGrid = (number) => {
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

function display(board) {
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

function getRandomPosition(gridSize,shipLength){
  const orientation = Math.random() < 0.5 ? 'horizontal': 'vertical';
  let row,col;
  if(orientation == 'horizontal'){
    row = Math.floor(Math.random() * gridSize);
    col = Math.floor(Math.random() * (gridSize-shipLength+1));
  }
  else{
    row = Math.floor(Math.random() * (gridSize-shipLength+1));
    col = Math.floor(Math.random() * gridSize);
  }
  return {row,col,orientation};
}

function placeShip(grid,shipLength){
  const position = getRandomPosition(grid.length,shipLength);
  const {row,col,orientation} = position;
  for(let i =0; i<shipLength;i++){
    if(orientation=='horizontal'){
      grid[row][col+i] = 'Ship';
    }
    else{
      grid[row+i][col] = 'Ship';
    }
  }
}

let playAgain = true;

while (playAgain) {
  readline.question("Press any key to start!");

  const ships = [2,3,3,4,5];
  const grid10 = makeGrid(10);

  ships.forEach((shipLength)=>{
    placeShip(grid10,shipLength);
  });
  let remainingShipsParts = ships.reduce((sum,length)=>sum+length,0);
  while (remainingShipsParts > 0) {
    display(grid10);
    let location = [];
    let target = readline.question("Enter a location to Strike ie 'A2'");

    if (!location.includes(target)) {
      location.push(target);
      let gridValue = grid10[variableNum[target[0].toUpperCase()] - 1][target[1] - 1];
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
