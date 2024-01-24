// const Users = () => {
//   const UserX = (() => {
//     const name = document.getElementById("playerX").value;
//     const symbol = "X";
//     let count = 0;
//     const counter = function () {
//       count++;
//       console.log("UserX count:", count);
//       return count;
//     };
//     return { name, symbol, count, counter };
//     })();

//   const UserO = (() => {
//     const name = document.getElementById("playerO").value;
//     const symbol = "O";
//     let count = 0;
//     const counter = function () {
//       count++;
//     };
//     return { name, symbol, count, counter };
//   })();

//   return [UserX, UserO];
// };

// function User(name, symbol) {
//   let count = 0;
//   const counter = () => {
//     count++;
//     console.log(name + " count:", count);
//     return count;
//   };
//   return { name, symbol, count, counter };
// }

// function Users() {
//   const userX = User(document.getElementById("playerX").value, "X");
//   const userO = User(document.getElementById("playerO").value, "O");
//   return [userX, userO];
// }
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

function playRound() {
  const userX = User(document.getElementById("playerX").value, "X");
  const userO = User(document.getElementById("playerO").value, "O");
  const screenBoard = Array.from(document.querySelectorAll(".boardTile"));
  Gameboard.liveBoard = Gameboard.layout;

  screenBoard.forEach((tile) => {
    tile.addEventListener("click", function clickHandler() {
      if (userX.count === userO.count) {
        tile.innerHTML = userX.symbol;
        userX.count++;

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
