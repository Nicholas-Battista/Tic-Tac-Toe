function User(name, symbol) {
  let count = 0;
  return { name, symbol, count };
}

const Gameboard = (() => {
  const layout = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  let liveBoard = layout;

  const updateValue = (i, j, value) => {
    liveBoard[i][j] = value;
    return liveBoard;
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

function updateLiveBoard(index) {
  let row;
  if (index <= 3) {
    row = 0;
  } else if (index <= 6 && index > 3) {
    row = 1;
  } else row = 2;
  console.log(row);

  let position = Gameboard.liveBoard[row].indexOf(index);
  Gameboard.updateValue(row, position, "X");
}

function playRound() {
  const userX = User(document.getElementById("playerX").value, "X");
  const userO = User(document.getElementById("playerO").value, "O");
  const screenBoard = Array.from(document.querySelectorAll(".boardTile"));
  Gameboard.liveBoard = Gameboard.layout;
  console.log(Gameboard.liveBoard);

  screenBoard.forEach((tile) => {
    tile.addEventListener("click", function clickHandler() {
      if (userX.count === userO.count) {
        tile.innerHTML = userX.symbol;
        userX.count++;

        let index = parseInt(tile.classList.item(1));
        console.log(index);
        updateLiveBoard(index);
        console.log(Gameboard.liveBoard);

        console.log(userX);
      } else {
        tile.innerHTML = userO.symbol;
        userO.count++;
        console.log(userO);
      }
      tile.removeEventListener("click", clickHandler);
    });
  });
}

function handleStartBtn() {
  playRound();
}

const startBtn = document.querySelector(".start");
startBtn.addEventListener("click", handleStartBtn);
