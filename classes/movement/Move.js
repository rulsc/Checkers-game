function Move(rows, start, end) {
  this.rows = rows;
  this.start = start;
  this.end = end;
}

Move.prototype.execute = function () {
  this.end.checker = this.start.checker;
  this.start.checker = null;
  this.kingCheck();
  this.save();
  this.start.clear();
  this.end.redraw();
};

Move.prototype.save = function () {
  const rows = this.rows;
  rows[this.end.rowNum]["squares"][this.end.squareNum] = {
    checker: { ...this.end.checker },
  };
  rows[this.start.rowNum]["squares"][this.start.squareNum] = {
    checker: this.start.checker,
  };
};

Move.prototype.kingCheck = function () {
  const color = this.end.checker.color;
  const endRow = +this.end.rowNum;
  if (color === "black") {
    if (endRow === 8) {
      this.end.checker.crown();
    } else {
      console.log("no need to crown king");
    }
  } else {
    if (endRow === 1) {
      this.end.checker.crown();
    }
  }
};
