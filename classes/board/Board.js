function Board(rows) {
  this.rows = rows;
}

Board.prototype.clear = function () {
  const board = document.getElementById("board");
  while (board.firstChild) board.removeChild(board.firstChild);
};

Board.prototype.draw = function () {
  const board = document.getElementById("board");
  const checkerBoard = document.createElement("fieldset");
  const rows = this.rows;
  let row, squares;
  for (const rowNum in rows) {
    squares = rows[rowNum].squares;
    row = new Row(rowNum, squares);
    checkerBoard.prepend(row.draw());
  }
  board.appendChild(checkerBoard);
};

Board.prototype.redraw = function () {
  this.clear();
  this.draw();
};
