let currentPlayer = "X";

let gameBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let gameHistory = [gameBoard];

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
    console.log(gameBoard);
    if (checkWin()) {
      console.log(currentPlayer + " wins!");
      cells.forEach((cell) => {
        cell.removeEventListener("click", handleMoveListener);
      });
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
    if (currentPlayer === "X") {
      xTurn();
    } else {
      oTurn();
    }
    gameHistory.push(JSON.parse(JSON.stringify(gameBoard))); // store a copy of the current game board in gameHistory
  }
}
function xTurn() {
  document.getElementById("xturn").classList.remove("opacity-0");
  document.getElementById("oturn").classList.add("opacity-0");
}
function oTurn() {
  document.getElementById("oturn").classList.remove("opacity-0");
  document.getElementById("xturn").classList.add("opacity-0");
}
const cells = document.querySelectorAll(".cell");
const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);

let handleMoveListener;

function startGame() {
  handleMoveListener = (event) => {
    const cell = event.target;
    const cellId = cell.id;
    const row = Math.floor((parseInt(cellId.substring(5)) - 1) / 3);
    const col = (parseInt(cellId.substring(5)) - 1) % 3;
    handleMove(row, col);
  };

  cells.forEach((cell) => {
    cell.addEventListener("click", handleMoveListener);
  });
}
function resetGame() {
  gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  gameHistory = [
    {
      player: "X",
      board: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      move: null,
    },
  ];
  currentPlayer = "X";
  cells.forEach((cell) => {
    cell.textContent = "";
    currentHistoryIndex = 0;
  });
}
const nextBtn = document.getElementById("next-button");
nextBtn.addEventListener("click", nextMove);
const prevBtn = document.getElementById("prev-button");
prevBtn.addEventListener("click", previousMove);

let currentMoveIndex = gameHistory.length - 1; // set to last move index (winning move)
updateBoard();

function previousMove() {
  if (currentMoveIndex > 0) {
    currentMoveIndex--;
    updateBoard();
  }
}

function nextMove() {
  if (currentMoveIndex < gameHistory.length - 1) {
    currentMoveIndex++;
    updateBoard();
  }
}

function updateBoard() {
  const gameState = gameHistory[currentMoveIndex];
  displayBoard(gameState);
}
