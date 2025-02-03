// Variable to track whose turn it is. True means O's turn, false means X's turn
let turnO = true;

// Get all the boxes (cells) and the reset button
const boxes = document.querySelectorAll(".box");
const resetBtn = document.getElementById("reset-btn");
const winnerMessage = document.getElementById("winner-message");

// Define the winning patterns (index combinations)
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Function to check if there is a winner
function checkWinner() {
  // Loop through each winning pattern
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;

    // Check if all three positions in the pattern are the same (O or X)
    if (
      boxes[a].innerText &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[b].innerText === boxes[c].innerText
    ) {
      // Display the winner message
      winnerMessage.innerText = `Player ${boxes[a].innerText} Win!`;
      disableAllBoxes(); // Disable all the boxes
      return;
    }
  }

  // Check if all boxes are filled (draw condition)
  if ([...boxes].every((box) => box.innerText !== "")) {
    winnerMessage.innerText = "It's a draw!"; // Display draw message
  }
}

// Disable all boxes once the game ends (win or draw)
function disableAllBoxes() {
  boxes.forEach((box) => (box.disabled = true));
}

// Function to reset the game
function resetGame() {
  // Clear all cells and enable them for a new game
  boxes.forEach((box) => {
    box.innerText = ""; // Clear the cell
    box.disabled = false; // Enable the cell
  });
  turnO = true; // Player O starts again
  winnerMessage.innerText = ""; // Clear any winner or draw message
}

// Event listener for each box (cell)
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "") return; // Ignore if the box is already filled

    // Set the text based on the current player's turn
    box.innerText = turnO ? "O" : "X";
    turnO = !turnO; // Switch the turn (O to X, X to O)

    // Check if there's a winner after this move
    checkWinner();
  });
});

// Event listener for the reset button
resetBtn.addEventListener("click", resetGame);
