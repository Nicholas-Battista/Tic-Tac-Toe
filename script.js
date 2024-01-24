const Gameboard = (() => {
  let layout = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  return { layout };
})();

const newGame = (function () {
  const boardContainer = document.querySelector(".board-container");
  let gameBoard = Gameboard.layout;
  gameBoard.forEach((row) => {
    row.forEach((item) => {
      let boardTile = document.createElement("div");
      boardTile.innerHTML = item;
      boardTile.classList.add("boardTile");
      boardContainer.appendChild(boardTile);
    });
  });
})();
