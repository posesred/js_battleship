
//When i first did this assisngment i did part 1 and 2 combined so when i had to do part 1 in a seperate file i had trouble importing 
// could you show me how to import the functions from part2.js to part1.js? thank you!
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

export const findKeyByValue = (obj, target) => {
  for (const [key, value] of Object.entries(variableNum)) {
    if (value == target) {
      return key;
    }
  }
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



let playAgain = true;

while (playAgain) {
  readline.keyInPause("Press any key to start!");
  const grid3 = makeGrid(3);

  let remainingShipsParts = 2;
  let location = [];
  while (remainingShipsParts > 0) {
    
    let ship1col, ship1row, ship2col, ship2row;
    do {
      ship1col = Math.floor(Math.random() * 3);
      ship1row = Math.floor(Math.random() * 3);
      ship2col = Math.floor(Math.random() * 3);
      ship2row = Math.floor(Math.random() * 3);
    } while (ship1col === ship2col && ship1row === ship2row);
    grid3[ship1row][ship1col] = "ship";
    grid3[ship2row][ship2col] = "ship";
    display(grid3);
    let target = readline.question("Enter a location to Strike ie 'A2'");
    
    const row = variableNum[target[0].toUpperCase()] - 1;
    const col = parseInt(target.slice(1)) - 1;

    if (location.includes(target)) {
      console.log("You have already picked this location. Miss!");
      continue;
    }

    if (!location.includes(target)) {
      location.push(target);
      let gridValue = grid3[row][col];
      if (gridValue === "ship") {
        remainingShipsParts--;
        console.log(
          `Hit. You have sunk a battleship. ${remainingShipsParts} ship parts remaining.`
        );
        if (remainingShipsParts === 0) {
          console.log("You have destroyed all battleships.");
        }
      } else {
        console.log("Miss. Try again.");
      }
    } else {
      console.log("You have already picked this location. Miss!");
      continue;
    }
  }

  let playAgainInput = readline.question(
    "Would you like to play again? (Y/N): "
  );
  playAgain = playAgainInput.toUpperCase() === "Y";
}
