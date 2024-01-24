const Users = () => {
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

  return [UserX, UserO];
};

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

function playRound(playerX, playerO) {
  const screenBoard = Array.from(document.querySelectorAll(".boardTile"));
  screenBoard.forEach((tile) => {
    tile.addEventListener("click", () => {
      tile.innerHTML = playerX.symbol + playerO.symbol;
    });
  });
}

function handleStartBtn() {
  let players = Users();
  console.log(players);
  playRound(players[0], players[1]);
}

const startBtn = document.querySelector(".start");
startBtn.addEventListener("click", handleStartBtn);
