const Gameboard = (() => {
  const layout = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  let liveBoard = [];

  const updateValue = (value, row, col) => {
    return (liveBoard[row][col] = value);
  };

  return { layout, liveBoard, updateValue };
})();

const newGame = (function () {
  const boardContainer = document.querySelector(".board-container");
  let gameBoard = Gameboard.layout;

  gameBoard.forEach((row) => {
    row.forEach((item) => {
      let boardTile = document.createElement("div");
      boardTile.classList.add("boardTile");
      boardTile.classList.add(item);
      boardContainer.appendChild(boardTile);
    });
  });
})();

function handleStartBtn() {
  const UserX = (() => {
    const name = document.getElementById("playerX").value;
    const symbol = "X";
    return { name, symbol };
  })();

  const UserO = (() => {
    const name = document.getElementById("playerO").value;
    const symbol = "O";
    return { name, symbol };
  })();

  console.log(UserX);
  console.log(UserO);
}

const startBtn = document.querySelector(".start");
startBtn.addEventListener("click", handleStartBtn);
