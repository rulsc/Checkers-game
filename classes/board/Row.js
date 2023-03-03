function Row(rowNum, squares) {
  this.rowNum = rowNum;
  this.squares = squares;
}

Row.prototype.draw = function () {
  const squares = this.squares;
  const rowNum = this.rowNum;
  const row = document.createElement("div");
  let checker, square;
  row.className = "row";
  row.dataset.rowNum = rowNum;
  for (const squareNum in squares) {
    checker = squares[squareNum].checker;
    square = checker
      ? new Square(
          rowNum,
          squareNum,
          new Checker(checker.color, checker.isKing)
        )
      : new Square(rowNum, squareNum, checker);
    row.prepend(square.draw());
  }
  return row;
};
