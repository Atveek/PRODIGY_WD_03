const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("resetButton");
let currentPlayer = "X";
let gameState = Array(9).fill(null);
let gameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", handleReset);

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

  if (gameState[clickedCellIndex] !== null || !gameActive) {
    return;
  }

  gameState[clickedCellIndex] = currentPlayer;
  console.log(gameState[clickedCellIndex]);
  clickedCell.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `${currentPlayer} Wins!`;
    clickedCell.style.backgroundColor = currentPlayer === "X" ? "red" : "blue";
    gameActive = false;
  } else if (gameState.every((cell) => cell !== null)) {
    clickedCell.style.backgroundColor = currentPlayer === "X" ? "red" : "blue";
    statusText.textContent = `Match Draw!`;
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    clickedCell.style.backgroundColor = currentPlayer === "X" ? "blue" : "red";
  }
}

const checkWinner = () => {
  return winningConditions.some((condition) => {
    const [a, b, c] = condition;
    return (
      gameState[a] !== null &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    );
  });
};

function handleReset() {
  currentPlayer = "X";
  gameState = Array(9).fill(null);
  gameActive = true;
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
  });
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}
