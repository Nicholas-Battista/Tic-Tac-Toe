const layout = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

let liveBoard = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

function User(name, symbol) {
  let count = 0;
  let win = false;
  return { name, symbol, count, win };
}

const newGame = (function () {
  const boardContainer = document.querySelector(".board-container");
  let gameBoard = layout;

  gameBoard.forEach((row) => {
    row.forEach((item) => {
      let boardTile = document.createElement("div");
      boardTile.classList.add("boardTile");
      boardTile.classList.add(item);
      boardContainer.appendChild(boardTile);
    });
  });
})();

function getScreenBoard() {
  return Array.from(document.querySelectorAll(".boardTile"));
}

function updateLiveBoard(index, user) {
  let row;
  if (index <= 3) {
    row = 0;
  } else if (index <= 6 && index > 3) {
    row = 1;
  } else row = 2;

  let position = liveBoard[row].indexOf(index);
  liveBoard[row][position] = user.symbol;
}

function checkWinner(user) {
  /* prettier-ignore */
  const winPatterns = [
    [[0, 0],[0, 1],[0, 2]],
    [[1, 0],[1, 1],[1, 2]],
    [[2, 0],[2, 1],[2, 2]],
    [[0, 0],[1, 0],[2, 0]],
    [[0, 1],[1, 1],[2, 1]],
    [[0, 2],[1, 2],[2, 2]],
    [[0, 0],[1, 1],[2, 2]],
    [[0, 2],[1, 1],[2, 0]]
  ];
  /* prettier-ignore */

  winPatterns.forEach((pattern) => {
    const [a, b, c] = pattern;
    if (
      liveBoard[a[0]][a[1]] === liveBoard[b[0]][b[1]] &&
      liveBoard[a[0]][a[1]] === liveBoard[c[0]][c[1]]
    ) {
        return user.win = true;
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
  const container = document.querySelector(".board-container");
  liveBoard = layout;

  container.addEventListener("click", clickHandler);

  function clickHandler(event) {
    if (event.target.matches(".boardTile")) {
      let tile = event.target;
      console.log(tile);
      if (userX.count === userO.count) {
        tile.innerHTML = userX.symbol;
        userX.count++;

        let index = parseInt(tile.classList.item(1));
        updateLiveBoard(index, userX);
        console.log(liveBoard);
        checkWinner(userX);
        if (userX.win) {
          container.removeEventListener("click", clickHandler);
        }
        displayWinner(userX);
      } else {
        tile.innerHTML = userO.symbol;
        userO.count++;

        let index = parseInt(tile.classList.item(1));
        updateLiveBoard(index, userO);
        checkWinner(userO);
        if (userO.win) {
          container.removeEventListener("click", clickHandler);
        }
        displayWinner(userO);
      }
      tile.removeEventListener("click", () => clickHandler);
    }
  }

  // only pop up once someone has won
  document.querySelector(".again").addEventListener("click", () => {
    liveBoard = layout;
    console.log(liveBoard);
    userX.win = false;
    userX.count = 0;
    userO.win = false;
    userO.count = 0;
    console.log(userX);
    console.log(userO);
    let screenBoard = getScreenBoard();
    screenBoard.forEach((tile) => {
      tile.innerHTML = "";
    });
    container.addEventListener("click", clickHandler);
  });
}

function handleStartBtn() {
  playRound();
}

const startBtn = document.querySelector(".start");
startBtn.addEventListener("click", handleStartBtn);
