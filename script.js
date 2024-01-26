let liveBoard = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

function resetLiveboard() {
  liveBoard = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
}

function User(name, symbol) {
  let count = 0;
  let win = false;
  return { name, symbol, count, win };
}

const newGame = (function () {
  const boardContainer = document.querySelector(".board-container");
  let gameBoard = liveBoard;

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
    document.querySelector(".again").classList.toggle("is-inactive");
    return user.name + " has won the game!";
  }
}

function determineTurn(user) {
  return user.name + "'s turn!";
}

function detectNameX() {
  if (document.getElementById("playerX").value === "") {
    return "X";
  } else {
    return document.getElementById("playerX").value;
  }
}

function detectNameO() {
  if (document.getElementById("playerO").value === "") {
    return "O";
  } else {
    return document.getElementById("playerO").value;
  }
}

function playRound() {
  const userX = User(detectNameX(), "X");
  const userO = User(detectNameO(), "O");
  const container = document.querySelector(".board-container");
  const turn = document.querySelector(".turn");
  turn.innerHTML = determineTurn(userX);

  container.addEventListener("click", clickHandler);

  function clickHandler(event) {
    if (event.target.matches(".boardTile")) {
      let tile = event.target;

      if (userX.count === userO.count) {
        turn.innerHTML = determineTurn(userO);
        tile.innerHTML = userX.symbol;
        userX.count++;

        let index = parseInt(tile.classList.item(1));
        updateLiveBoard(index, userX);
        checkWinner(userX);
        if (userX.win) {
          container.removeEventListener("click", clickHandler);
          turn.innerHTML = displayWinner(userX);
        }
      } else {
        turn.innerHTML = determineTurn(userX);
        tile.innerHTML = userO.symbol;
        userO.count++;

        let index = parseInt(tile.classList.item(1));
        updateLiveBoard(index, userO);
        checkWinner(userO);
        if (userO.win) {
          container.removeEventListener("click", clickHandler);
          turn.innerHTML = displayWinner(userO);
        }
      }
      tile.removeEventListener("click", () => clickHandler);
    }
  }

  document.querySelector(".again").addEventListener("click", () => {
    resetLiveboard();
    document.querySelector(".again").classList.toggle("is-inactive");
    turn.innerHTML = determineTurn(userX);
    userX.win = false;
    userX.count = 0;

    userO.win = false;
    userO.count = 0;

    let screenBoard = getScreenBoard();
    screenBoard.forEach((tile) => {
      tile.innerHTML = "";
    });
    container.addEventListener("click", clickHandler);
  });
}

function handleStartBtn() {
  startBtn.classList.toggle("is-inactive");
  playRound();
}

const startBtn = document.querySelector(".start");
startBtn.addEventListener("click", handleStartBtn);
