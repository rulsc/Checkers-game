function Jump(rows, start, end, capture) {
  this.rows = rows;
  this.start = start;
  this.end = end;
  this.capture = capture;
}

Jump.prototype.execute = function () {
  this.end.checker = this.start.checker;
  this.start.checker = null;
  this.capture.checker = null;
  this.kingCheck();
  this.save();
  this.start.clear();
  this.capture.clear();
  this.end.redraw();
};

Jump.prototype.save = function () {
  const rows = this.rows;
  rows[this.end.rowNum]["squares"][this.end.squareNum] = {
    checker: { ...this.end.checker },
  };
  rows[this.start.rowNum]["squares"][this.start.squareNum] = {
    checker: this.start.checker,
  };
  rows[this.capture.rowNum]["squares"][this.capture.squareNum] = {
    checker: this.capture.checker,
  };
};

Jump.prototype.kingCheck = function () {
  const color = this.end.checker.color;
  const endRow = +this.end.rowNum;
  if (color === "black") {
    if (endRow === 8) {
      this.end.checker.crown();
    }
  } else {
    if (endRow === 1) {
      this.end.checker.crown();
    }
  }
};
