let currentPlayer = "X";
let gameBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

function checkWin() {
  // check for horizontal wins
  for (let i = 0; i < 3; i++) {
    if (
      gameBoard[i][0] === currentPlayer &&
      gameBoard[i][1] === currentPlayer &&
      gameBoard[i][2] === currentPlayer
    ) {
      return true;
    }
  }

  // vertical wins
  for (let i = 0; i < 3; i++) {
    if (
      gameBoard[0][i] === currentPlayer &&
      gameBoard[1][i] === currentPlayer &&
      gameBoard[2][i] === currentPlayer
    ) {
      return true;
    }
  }

  // diagonal wins
  if (
    gameBoard[0][0] === currentPlayer &&
    gameBoard[1][1] === currentPlayer &&
    gameBoard[2][2] === currentPlayer
  ) {
    return true;
  }
  if (
    gameBoard[0][2] === currentPlayer &&
    gameBoard[1][1] === currentPlayer &&
    gameBoard[2][0] === currentPlayer
  ) {
    return true;
  }
  return false;
}

function handleMove(row, col) {
  if (gameBoard[row][col] === "") {
    gameBoard[row][col] = currentPlayer;
    cells[row * 3 + col].textContent = currentPlayer;
    if (checkWin()) {
      console.log(currentPlayer + " wins!");
      resetGame();
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
}

function resetGame() {
  gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  currentPlayer = "X";
  cells.forEach((cell) => {
    cell.textContent = "";
  });
}

const cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    const cellId = cell.id;
    const row = Math.floor((parseInt(cellId.substring(5)) - 1) / 3);
    const col = (parseInt(cellId.substring(5)) - 1) % 3;
    handleMove(row, col);
  });
});
