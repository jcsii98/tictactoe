let currentPlayer = "X";

let gameBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let gameHistory = [gameBoard];

const cells = document.querySelectorAll(".cell");

function checkWin() {
  // check for horizontal & vertical wins
  for (let i = 0; i < 3; i++) {
    if (
      (gameBoard[i][0] === currentPlayer &&
        gameBoard[i][1] === currentPlayer &&
        gameBoard[i][2] === currentPlayer) ||
      (gameBoard[0][i] === currentPlayer &&
        gameBoard[1][i] === currentPlayer &&
        gameBoard[2][i] === currentPlayer)
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
      cells.forEach((cell) => {
        cell.removeEventListener("click", handleMoveListener);
      });
      setTimeout(() => {
        noTurn();
        console.log(currentPlayer + " wins!");
        modalH1.textContent = `${currentPlayer} wins!`;
        openModal();
        replayBtnShow();
      }, 100);
    } else if (gameHistory.length === 9) {
      // check if tie
      modalH1.textContent = "Draw";
      openModal();
      replayBtnShow();
      noTurn();
      console.log("tie");
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
    gameHistory.push(JSON.parse(JSON.stringify(gameBoard)));
  }
}

function noTurn() {
  console.log("noTurn called");
  const xturn = document.getElementById("xturn");
  const oturn = document.getElementById("oturn");
  xturn.classList.add("opacity-0");
  oturn.classList.add("opacity-0");
}

function xTurn() {
  document.getElementById("xturn").classList.remove("opacity-0");
  document.getElementById("oturn").classList.add("opacity-0");
}

function oTurn() {
  document.getElementById("oturn").classList.remove("opacity-0");
  document.getElementById("xturn").classList.add("opacity-0");
}

const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset");
startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);

// main controls

let handleMoveListener;
function startGame() {
  handleMoveListener = (event) => {
    const cell = event.target;
    const cellId = cell.id;
    const row = Math.floor((parseInt(cellId.substring(5)) - 1) / 3);
    const col = (parseInt(cellId.substring(5)) - 1) % 3;
    handleMove(row, col);
  };
  startBtn.disabled = true;
  xTurn();
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
    },
  ];
  currentPlayer = "X";
  xTurn();
  cells.forEach((cell) => {
    cell.textContent = "";
    currentHistoryIndex = 0;
  });
  replayHideAll();
  startGame();
}

// game replay

const replayBtn = document.getElementById("replay-button");
const nextBtn = document.getElementById("next-button");
const prevBtn = document.getElementById("prev-button");

replayBtn.addEventListener("click", showControls);
nextBtn.addEventListener("click", nextMove);
prevBtn.addEventListener("click", previousMove);

function replayHideAll() {
  replayBtn.style.display = "none";
  prevBtn.style.display = "none";
  nextBtn.style.display = "none";
}
function replayBtnShow() {
  replayBtn.style.display = "block";
}
function showControls() {
  cells.forEach((cell) => {
    cell.removeEventListener("click", handleMoveListener);
  });
  // reset board to first move
  const firstState = gameHistory[1];
  currentMoveIndex = 1;
  updateBoard(firstState);
  // show replay controls
  replayBtn.style.display = "none";
  prevBtn.disabled = true;
  nextBtn.disabled = false;
  prevBtn.style.display = "block";
  nextBtn.style.display = "block";
  backdrop.style.display = "none";
  modal.style.display = "none";
}

let currentMoveIndex = gameHistory.length - 1;

function nextMove() {
  if (currentMoveIndex < gameHistory.length - 1) {
    currentMoveIndex++;
    updateBoard(gameHistory[currentMoveIndex]);
    prevBtn.disabled = false; // enable previous button
  }
  if (currentMoveIndex >= gameHistory.length - 1) {
    nextBtn.disabled = true; // disable next button
  }
}

function previousMove() {
  if (currentMoveIndex > 0) {
    currentMoveIndex--;
    updateBoard(gameHistory[currentMoveIndex]);
    nextBtn.disabled = false; // enable next button
  }
  if (currentMoveIndex <= 1) {
    prevBtn.disabled = true; // disable previous button
  }
}

function updateBoard() {
  gameBoard = gameHistory[currentMoveIndex];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cell = cells[i * 3 + j];
      if (cell) {
        cell.textContent = gameBoard[i][j];
      }
    }
  }
}

// modals

let backdrop = document.querySelector(".backdrop");
let modal = document.querySelector(".modal");
let modalH1 = document.querySelector(".modal-h1");

function openModal() {
  backdrop.style.display = "block";
  modal.style.display = "flex";
}

function hideModal() {
  backdrop.style.display = "none";
  modal.style.display = "flex";
}
