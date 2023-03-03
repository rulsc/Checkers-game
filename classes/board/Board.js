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
  const frag = document.createDocumentFragment();
  //const reset = document.createElement("input");
  const rows = this.rows;
  let row, squares;
  //reset.type = "reset";
  //reset.className = "reset";
  //reset.id = "reset";
  //reset.value = "Start Over";
  for (const rowNum in rows) {
    squares = rows[rowNum].squares;
    row = new Row(rowNum, squares);
    checkerBoard.prepend(row.draw());
  }
  frag.appendChild(checkerBoard);
  //frag.appendChild(reset);
  board.appendChild(frag);
};

Board.prototype.redraw = function () {
  this.clear();
  this.draw();
};
