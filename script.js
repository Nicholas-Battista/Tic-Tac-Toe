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

function updateLiveBoard(index, user) {
  let row;
  if (index <= 3) {
    row = 0;
  } else if (index <= 6 && index > 3) {
    row = 1;
  } else row = 2;
  console.log(row);

  let position = Gameboard.liveBoard[row].indexOf(index);
  Gameboard.updateValue(row, position, user.symbol);
}

function checkWinner(userX, userO) {
  // if x or o symbol is found in array then check nearest items, if another is found check again, if third is found return winner
  if (
    Gameboard.liveBoard.includes(userX.symbol) ||
    Gameboard.liveBoard.includes(userO.symbol)
  ) {
  }
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
        updateLiveBoard(index, userX);
        console.log(Gameboard.liveBoard);
      } else {
        tile.innerHTML = userO.symbol;
        userO.count++;

        let index = parseInt(tile.classList.item(1));
        updateLiveBoard(index, userO);
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
