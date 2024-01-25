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

function User(name, symbol) {
  let count = 0;
  let win = false;
  return { name, symbol, count, win };
}

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
  /* prettier-ignore */
  const winPatterns = [
    [[0, 0],[0, 1],[0, 2]],
    [[1, 0],[1, 1],[1, 2]],
    [[2, 0],[2, 1],[2, 2]],
    [[0, 0],[1, 0],[2, 0]],
    [[0, 1],[1, 1], [2, 1]],
    [[0, 2],[1, 2],[2, 2]],
    [[0, 0],[1, 1],[2, 2]],
    [[0, 2],[1, 1],[2, 0]]
  ];
  /* prettier-ignore */

  winPatterns.forEach((pattern) => {
    const [a, b, c] = pattern;
    if (
      Gameboard.liveBoard[a[0]][a[1]] === Gameboard.liveBoard[b[0]][b[1]] &&
      Gameboard.liveBoard[a[0]][a[1]] === Gameboard.liveBoard[c[0]][c[1]]
    ) {
      if (Gameboard.liveBoard[a[0]][a[1]] === userX.symbol) {
        return (userX.win = true);
      } else {
        return (userO.win = true);
      }
    }
  });
}

function displayWinner(user) {
  if (user.win) {
    return console.log(user.name + " has won the game!");
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
        checkWinner(userX, userO);
        displayWinner(userX);
      } else {
        tile.innerHTML = userO.symbol;
        userO.count++;

        let index = parseInt(tile.classList.item(1));
        updateLiveBoard(index, userO);
        checkWinner(userX, userO);
        displayWinner(userO);
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
