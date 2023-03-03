function Square(rowNum, squareNum, checker = null) {
  this.rowNum = rowNum;
  this.squareNum = squareNum;
  this.checker = checker;
}

Square.prototype.draw = function () {
  const square = document.createElement("div");
  const checker = this.checker;
  square.className = "square";
  square.dataset.rowNum = this.rowNum;
  square.dataset.squareNum = this.squareNum;
  if (checker) square.appendChild(checker.draw());
  return square;
};

Square.prototype.clear = function () {
  const square = document.querySelector(
    `[data-square-num=\"${this.squareNum}\"]`
  );
  if (square.firstChild) square.removeChild(square.firstChild);
  return square;
};

Square.prototype.redraw = function () {
  const square = this.clear();
  const checker = this.checker;
  if (checker) square.appendChild(checker.draw());
};
