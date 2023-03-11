function Player(
  color,
  isActive = false,
  isAI = false,
  pieceCount = 12,
  turnCount = 0
) {
  this.color = color;
  this.isActive = isActive;
  this.isAI = isAI;
  this.pieceCount = pieceCount;
  this.turnCount = turnCount;
  this.jumps = [];
  this.moves = [];
  this.activeSquares = [];
  this.startSquare = null;
  this.endSquare = null;
}

Player.prototype.findJumps = function (rows) {
  const startSquare = this.startSquare;
  let rowNum,
    squares,
    square,
    squareNum,
    rowPlusOne,
    rowMinusOne,
    rowPlusTwo,
    rowMinusTwo,
    rowIsOdd,
    isKing,
    leftDiagNear,
    leftDiagFar,
    rightDiagNear,
    rightDiagFar,
    testSquareNum;
  this.clearJumps();
  if (startSquare) {
    rowPlusOne = startSquare.rowNum + 1;
    rowMinusOne = startSquare.rowNum - 1;
    rowPlusTwo = rowPlusOne + 1;
    rowMinusTwo = rowMinusOne - 1;
    rowIsOdd = startSquare.rowNum % 2 !== 0;
    isKing = startSquare.checker.isKing;

    if (this.color === "black" || isKing) {
      if (rowPlusTwo < 9) {
        if (rowIsOdd) {
          testSquareNum = startSquare.squareNum + 9;

          if (rows[rowPlusTwo]["squares"][testSquareNum]) {
            leftDiagFar = rows[rowPlusTwo]["squares"][testSquareNum];
            leftDiagNear = rows[rowPlusOne]["squares"][testSquareNum - 4];
            if (leftDiagFar.checker === null) {
              if (
                leftDiagNear.checker &&
                leftDiagNear.checker.color !== this.color
              ) {
                this.jumps.push(
                  new Jump(
                    rows,
                    new Square(
                      startSquare.rowNum,
                      startSquare.squareNum,
                      new Checker(this.color, isKing)
                    ),
                    new Square(rowPlusTwo, testSquareNum),
                    new Square(
                      rowPlusOne,
                      testSquareNum - 4,
                      new Checker(this.color === "black" ? "red" : "black")
                    )
                  )
                );
              }
            }
          }

          testSquareNum = startSquare.squareNum + 7;

          if (rows[rowPlusTwo]["squares"][testSquareNum]) {
            rightDiagFar = rows[rowPlusTwo]["squares"][testSquareNum];
            rightDiagNear = rows[rowPlusOne]["squares"][testSquareNum - 3];
            if (rightDiagFar.checker === null) {
              if (
                rightDiagNear.checker &&
                rightDiagNear.checker.color !== this.color
              ) {
                this.jumps.push(
                  new Jump(
                    rows,
                    new Square(
                      startSquare.rowNum,
                      startSquare.squareNum,
                      new Checker(this.color, isKing)
                    ),
                    new Square(rowPlusTwo, testSquareNum),
                    new Square(
                      rowPlusOne,
                      testSquareNum - 3,
                      new Checker(this.color === "black" ? "red" : "black")
                    )
                  )
                );
              }
            }
          }
        } else {
          // row is even
          testSquareNum = startSquare.squareNum + 9;

          if (rows[rowPlusTwo]["squares"][testSquareNum]) {
            leftDiagFar = rows[rowPlusTwo]["squares"][testSquareNum];
            leftDiagNear = rows[rowPlusOne]["squares"][testSquareNum - 5];
            if (leftDiagFar.checker === null) {
              if (
                leftDiagNear.checker &&
                leftDiagNear.checker.color !== this.color
              ) {
                this.jumps.push(
                  new Jump(
                    rows,
                    new Square(
                      startSquare.rowNum,
                      startSquare.squareNum,
                      new Checker(this.color, isKing)
                    ),
                    new Square(rowPlusTwo, testSquareNum),
                    new Square(
                      rowPlusOne,
                      testSquareNum - 5,
                      new Checker(this.color === "black" ? "red" : "black")
                    )
                  )
                );
              }
            }
          }

          testSquareNum = startSquare.squareNum + 7;

          if (rows[rowPlusTwo]["squares"][testSquareNum]) {
            rightDiagFar = rows[rowPlusTwo]["squares"][testSquareNum];
            rightDiagNear = rows[rowPlusOne]["squares"][testSquareNum - 4];
            if (rightDiagFar.checker === null) {
              if (
                rightDiagNear.checker &&
                rightDiagNear.checker.color !== this.color
              ) {
                this.jumps.push(
                  new Jump(
                    rows,
                    new Square(
                      startSquare.rowNum,
                      startSquare.squareNum,
                      new Checker(this.color, isKing)
                    ),
                    new Square(rowPlusTwo, testSquareNum),
                    new Square(
                      rowPlusOne,
                      testSquareNum - 4,
                      new Checker(this.color === "black" ? "red" : "black")
                    )
                  )
                );
              }
            }
          }
        }
      }
    }

    if (this.color === "red" || isKing) {
      if (rowMinusTwo > 0) {
        if (rowIsOdd) {
          testSquareNum = startSquare.squareNum - 7;

          if (rows[rowMinusTwo]["squares"][testSquareNum]) {
            leftDiagFar = rows[rowMinusTwo]["squares"][testSquareNum];
            leftDiagNear = rows[rowMinusOne]["squares"][testSquareNum + 4];
            if (leftDiagFar.checker === null) {
              if (
                leftDiagNear.checker &&
                leftDiagNear.checker.color !== this.color
              ) {
                this.jumps.push(
                  new Jump(
                    rows,
                    new Square(
                      startSquare.rowNum,
                      startSquare.squareNum,
                      new Checker(this.color, isKing)
                    ),
                    new Square(rowMinusTwo, testSquareNum),
                    new Square(
                      rowMinusOne,
                      testSquareNum + 4,
                      new Checker(this.color === "black" ? "red" : "black")
                    )
                  )
                );
              }
            }
          }

          testSquareNum = startSquare.squareNum - 9;

          if (rows[rowMinusTwo]["squares"][testSquareNum]) {
            rightDiagFar = rows[rowMinusTwo]["squares"][testSquareNum];
            rightDiagNear = rows[rowMinusOne]["squares"][testSquareNum + 5];
            if (rightDiagFar.checker === null) {
              if (
                rightDiagNear.checker &&
                rightDiagNear.checker.color !== this.color
              ) {
                this.jumps.push(
                  new Jump(
                    rows,
                    new Square(
                      startSquare.rowNum,
                      startSquare.squareNum,
                      new Checker(this.color, isKing)
                    ),
                    new Square(rowMinusTwo, testSquareNum),
                    new Square(
                      rowMinusOne,
                      testSquareNum + 5,
                      new Checker(this.color === "black" ? "red" : "black")
                    )
                  )
                );
              }
            }
          }
        } else {
          // row is even
          testSquareNum = startSquare.squareNum - 7;

          if (rows[rowMinusTwo]["squares"][testSquareNum]) {
            leftDiagFar = rows[rowMinusTwo]["squares"][testSquareNum];
            leftDiagNear = rows[rowMinusOne]["squares"][testSquareNum + 3];
            if (leftDiagFar.checker === null) {
              if (
                leftDiagNear.checker &&
                leftDiagNear.checker.color !== this.color
              ) {
                this.jumps.push(
                  new Jump(
                    rows,
                    new Square(
                      startSquare.rowNum,
                      startSquare.squareNum,
                      new Checker(this.color, isKing)
                    ),
                    new Square(rowMinusTwo, testSquareNum),
                    new Square(
                      rowMinusOne,
                      testSquareNum + 3,
                      new Checker(this.color === "black" ? "red" : "black")
                    )
                  )
                );
              }
            }
          }

          testSquareNum = startSquare.squareNum - 9;

          if (rows[rowMinusTwo]["squares"][testSquareNum]) {
            rightDiagFar = rows[rowMinusTwo]["squares"][testSquareNum];
            rightDiagNear = rows[rowMinusOne]["squares"][testSquareNum + 4];
            if (rightDiagFar.checker === null) {
              if (
                rightDiagNear.checker &&
                rightDiagNear.checker.color !== this.color
              ) {
                this.jumps.push(
                  new Jump(
                    rows,
                    new Square(
                      startSquare.rowNum,
                      startSquare.squareNum,
                      new Checker(this.color, isKing)
                    ),
                    new Square(rowMinusTwo, testSquareNum),
                    new Square(
                      rowMinusOne,
                      testSquareNum + 4,
                      new Checker(this.color === "black" ? "red" : "black")
                    )
                  )
                );
              }
            }
          }
        }
      }
    }
  } else {
    // no start square, find all jumps
    for (rowNum in rows) {
      squares = rows[rowNum]["squares"];
      for (squareNum in squares) {
        square = squares[squareNum];
        if (square.checker) {
          if (square.checker.color === this.color) {
            rowPlusTwo = +rowNum + 2;
            rowPlusOne = +rowNum + 1;
            rowMinusTwo = +rowNum - 2;
            rowMinusOne = +rowNum - 1;
            rowIsOdd = +rowNum % 2 !== 0;
            isKing = square.checker.isKing;

            if (this.color === "black" || isKing) {
              if (rowPlusTwo < 9) {
                if (rowIsOdd) {
                  testSquareNum = +squareNum + 9;

                  if (rows[rowPlusTwo]["squares"][testSquareNum]) {
                    leftDiagFar = rows[rowPlusTwo]["squares"][testSquareNum];
                    leftDiagNear =
                      rows[rowPlusOne]["squares"][testSquareNum - 4];
                    if (leftDiagFar.checker === null) {
                      if (
                        leftDiagNear.checker &&
                        leftDiagNear.checker.color !== this.color
                      ) {
                        this.jumps.push(
                          new Jump(
                            rows,
                            new Square(
                              +rowNum,
                              +squareNum,
                              new Checker(this.color, isKing)
                            ),
                            new Square(rowPlusTwo, testSquareNum),
                            new Square(
                              rowPlusOne,
                              testSquareNum - 4,
                              new Checker(
                                this.color === "black" ? "red" : "black"
                              )
                            )
                          )
                        );
                      }
                    }
                  }

                  testSquareNum = +squareNum + 7;

                  if (rows[rowPlusTwo]["squares"][testSquareNum]) {
                    rightDiagFar = rows[rowPlusTwo]["squares"][testSquareNum];
                    rightDiagNear =
                      rows[rowPlusOne]["squares"][testSquareNum - 3];
                    if (rightDiagFar.checker === null) {
                      if (
                        rightDiagNear.checker &&
                        rightDiagNear.checker.color !== this.color
                      ) {
                        this.jumps.push(
                          new Jump(
                            rows,
                            new Square(
                              +rowNum,
                              +squareNum,
                              new Checker(this.color, isKing)
                            ),
                            new Square(rowPlusTwo, testSquareNum),
                            new Square(
                              rowPlusOne,
                              testSquareNum - 3,
                              new Checker(
                                this.color === "black" ? "red" : "black"
                              )
                            )
                          )
                        );
                      }
                    }
                  }
                } else {
                  // row is even
                  testSquareNum = +squareNum + 9;

                  if (rows[rowPlusTwo]["squares"][testSquareNum]) {
                    leftDiagFar = rows[rowPlusTwo]["squares"][testSquareNum];
                    leftDiagNear =
                      rows[rowPlusOne]["squares"][testSquareNum - 5];
                    if (leftDiagFar.checker === null) {
                      if (
                        leftDiagNear.checker &&
                        leftDiagNear.checker.color !== this.color
                      ) {
                        this.jumps.push(
                          new Jump(
                            rows,
                            new Square(
                              +rowNum,
                              +squareNum,
                              new Checker(this.color, isKing)
                            ),
                            new Square(rowPlusTwo, testSquareNum),
                            new Square(
                              rowPlusOne,
                              testSquareNum - 5,
                              new Checker(
                                this.color === "black" ? "red" : "black"
                              )
                            )
                          )
                        );
                      }
                    }
                  }

                  testSquareNum = +squareNum + 7;

                  if (rows[rowPlusTwo]["squares"][testSquareNum]) {
                    rightDiagFar = rows[rowPlusTwo]["squares"][testSquareNum];
                    rightDiagNear =
                      rows[rowPlusOne]["squares"][testSquareNum - 4];
                    if (rightDiagFar.checker === null) {
                      if (
                        rightDiagNear.checker &&
                        rightDiagNear.checker.color !== this.color
                      ) {
                        this.jumps.push(
                          new Jump(
                            rows,
                            new Square(
                              +rowNum,
                              +squareNum,
                              new Checker(this.color, isKing)
                            ),
                            new Square(rowPlusTwo, testSquareNum),
                            new Square(
                              rowPlusOne,
                              testSquareNum - 4,
                              new Checker(
                                this.color === "black" ? "red" : "black"
                              )
                            )
                          )
                        );
                      }
                    }
                  }
                }
              }
            }

            if (this.color === "red" || isKing) {
              if (rowMinusTwo > 0) {
                if (rowIsOdd) {
                  testSquareNum = +squareNum - 7;

                  if (rows[rowMinusTwo]["squares"][testSquareNum]) {
                    leftDiagFar = rows[rowMinusTwo]["squares"][testSquareNum];
                    leftDiagNear =
                      rows[rowMinusOne]["squares"][testSquareNum + 4];
                    if (leftDiagFar.checker === null) {
                      if (
                        leftDiagNear.checker &&
                        leftDiagNear.checker.color !== this.color
                      ) {
                        this.jumps.push(
                          new Jump(
                            rows,
                            new Square(
                              +rowNum,
                              +squareNum,
                              new Checker(this.color, isKing)
                            ),
                            new Square(rowMinusTwo, testSquareNum),
                            new Square(
                              rowMinusOne,
                              testSquareNum + 4,
                              new Checker(
                                this.color === "black" ? "red" : "black"
                              )
                            )
                          )
                        );
                      }
                    }
                  }

                  testSquareNum = +squareNum - 9;

                  if (rows[rowMinusTwo]["squares"][testSquareNum]) {
                    rightDiagFar = rows[rowMinusTwo]["squares"][testSquareNum];
                    rightDiagNear =
                      rows[rowMinusOne]["squares"][testSquareNum + 5];
                    if (rightDiagFar.checker === null) {
                      if (
                        rightDiagNear.checker &&
                        rightDiagNear.checker.color !== this.color
                      ) {
                        this.jumps.push(
                          new Jump(
                            rows,
                            new Square(
                              +rowNum,
                              +squareNum,
                              new Checker(this.color, isKing)
                            ),
                            new Square(rowMinusTwo, testSquareNum),
                            new Square(
                              rowMinusOne,
                              testSquareNum + 5,
                              new Checker(
                                this.color === "black" ? "red" : "black"
                              )
                            )
                          )
                        );
                      }
                    }
                  }
                } else {
                  // row is even
                  testSquareNum = +squareNum - 7;

                  if (rows[rowMinusTwo]["squares"][testSquareNum]) {
                    leftDiagFar = rows[rowMinusTwo]["squares"][testSquareNum];
                    leftDiagNear =
                      rows[rowMinusOne]["squares"][testSquareNum + 3];
                    if (leftDiagFar.checker === null) {
                      if (
                        leftDiagNear.checker &&
                        leftDiagNear.checker.color !== this.color
                      ) {
                        this.jumps.push(
                          new Jump(
                            rows,
                            new Square(
                              +rowNum,
                              +squareNum,
                              new Checker(this.color, isKing)
                            ),
                            new Square(rowMinusTwo, testSquareNum),
                            new Square(
                              rowMinusOne,
                              testSquareNum + 3,
                              new Checker(
                                this.color === "black" ? "red" : "black"
                              )
                            )
                          )
                        );
                      }
                    }
                  }

                  testSquareNum = +squareNum - 9;

                  if (rows[rowMinusTwo]["squares"][testSquareNum]) {
                    rightDiagFar = rows[rowMinusTwo]["squares"][testSquareNum];
                    rightDiagNear =
                      rows[rowMinusOne]["squares"][testSquareNum + 4];
                    if (rightDiagFar.checker === null) {
                      if (
                        rightDiagNear.checker &&
                        rightDiagNear.checker.color !== this.color
                      ) {
                        this.jumps.push(
                          new Jump(
                            rows,
                            new Square(
                              +rowNum,
                              +squareNum,
                              new Checker(this.color, isKing)
                            ),
                            new Square(rowMinusTwo, testSquareNum),
                            new Square(
                              rowMinusOne,
                              testSquareNum + 4,
                              new Checker(
                                this.color === "black" ? "red" : "black"
                              )
                            )
                          )
                        );
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

Player.prototype.findMoves = function (rows) {
  const startSquare = this.startSquare;
  let rowNum,
    squares,
    square,
    squareNum,
    rowPlusOne,
    rowMinusOne,
    rowIsOdd,
    isKing,
    leftDiagNear,
    rightDiagNear,
    testSquareNum;
  this.clearMoves();
  if (startSquare) {
    rowPlusOne = startSquare.rowNum + 1;
    rowMinusOne = startSquare.rowNum - 1;
    rowIsOdd = startSquare.rowNum % 2 !== 0;
    isKing = startSquare.checker.isKing;

    if (this.color === "black" || isKing) {
      if (rowPlusOne < 9) {
        if (rowIsOdd) {
          testSquareNum = startSquare.squareNum + 5;

          if (rows[rowPlusOne]["squares"][testSquareNum]) {
            leftDiagNear = rows[rowPlusOne]["squares"][testSquareNum];
            if (leftDiagNear.checker === null) {
              this.moves.push(
                new Move(
                  rows,
                  new Square(
                    startSquare.rowNum,
                    startSquare.squareNum,
                    new Checker(this.color, isKing)
                  ),
                  new Square(rowPlusOne, testSquareNum)
                )
              );
            }
          }

          testSquareNum = startSquare.squareNum + 4;

          if (rows[rowPlusOne]["squares"][testSquareNum]) {
            rightDiagNear = rows[rowPlusOne]["squares"][testSquareNum];
            if (rightDiagNear.checker === null) {
              this.moves.push(
                new Move(
                  rows,
                  new Square(
                    startSquare.rowNum,
                    startSquare.squareNum,
                    new Checker(this.color, isKing)
                  ),
                  new Square(rowPlusOne, testSquareNum)
                )
              );
            }
          }
        } else {
          // row is even
          testSquareNum = startSquare.squareNum + 4;

          if (rows[rowPlusOne]["squares"][testSquareNum]) {
            leftDiagNear = rows[rowPlusOne]["squares"][testSquareNum];
            if (leftDiagNear.checker === null) {
              this.moves.push(
                new Move(
                  rows,
                  new Square(
                    startSquare.rowNum,
                    startSquare.squareNum,
                    new Checker(this.color, isKing)
                  ),
                  new Square(rowPlusOne, testSquareNum)
                )
              );
            }
          }

          testSquareNum = startSquare.squareNum + 3;

          if (rows[rowPlusOne]["squares"][testSquareNum]) {
            rightDiagNear = rows[rowPlusOne]["squares"][testSquareNum];
            if (rightDiagNear.checker === null) {
              this.moves.push(
                new Move(
                  rows,
                  new Square(
                    startSquare.rowNum,
                    startSquare.squareNum,
                    new Checker(this.color, isKing)
                  ),
                  new Square(rowPlusOne, testSquareNum)
                )
              );
            }
          }
        }
      }
    }

    if (this.color === "red" || isKing) {
      if (rowMinusOne > 0) {
        if (rowIsOdd) {
          // row is odd
          testSquareNum = startSquare.squareNum - 3;

          if (rows[rowMinusOne]["squares"][testSquareNum]) {
            leftDiagNear = rows[rowMinusOne]["squares"][testSquareNum];
            if (leftDiagNear.checker === null) {
              this.moves.push(
                new Move(
                  rows,
                  new Square(
                    +rowNum,
                    +squareNum,
                    new Checker(this.color, isKing)
                  ),
                  new Square(rowMinusOne, testSquareNum)
                )
              );
            }
          }

          testSquareNum = startSquare.squareNum - 4;

          if (rows[rowMinusOne]["squares"][testSquareNum]) {
            rightDiagNear = rows[rowMinusOne]["squares"][testSquareNum];
            if (rightDiagNear.checker === null) {
              this.moves.push(
                new Move(
                  rows,
                  new Square(
                    startSquare.rowNum,
                    startSquare.squareNum,
                    new Checker(this.color, isKing)
                  ),
                  new Square(rowMinusOne, testSquareNum)
                )
              );
            }
          }
        } else {
          // row is even
          testSquareNum = startSquare.squareNum - 4;

          if (rows[rowMinusOne]["squares"][testSquareNum]) {
            leftDiagNear = rows[rowMinusOne]["squares"][testSquareNum];
            if (leftDiagNear.checker === null) {
              this.moves.push(
                new Move(
                  rows,
                  new Square(
                    +rowNum,
                    +squareNum,
                    new Checker(this.color, isKing)
                  ),
                  new Square(rowMinusOne, testSquareNum)
                )
              );
            }
          }

          testSquareNum = startSquare.squareNum - 5;

          if (rows[rowMinusOne]["squares"][testSquareNum]) {
            rightDiagNear = rows[rowMinusOne]["squares"][testSquareNum];
            if (rightDiagNear.checker === null) {
              this.moves.push(
                new Move(
                  rows,
                  new Square(
                    startSquare.rowNum,
                    startSquare.squareNum,
                    new Checker(this.color, isKing)
                  ),
                  new Square(rowMinusOne, testSquareNum)
                )
              );
            }
          }
        }
      }
    }
  } else {
    // no start square, find all moves
    for (rowNum in rows) {
      squares = rows[rowNum]["squares"];
      for (squareNum in squares) {
        square = squares[squareNum];
        if (square.checker) {
          if (square.checker.color === this.color) {
            rowPlusOne = +rowNum + 1;
            rowMinusOne = +rowNum - 1;
            rowIsOdd = +rowNum % 2 !== 0;
            isKing = square.checker.isKing;

            if (this.color === "black" || isKing) {
              if (rowPlusOne < 9) {
                if (rowIsOdd) {
                  testSquareNum = +squareNum + 5;

                  if (rows[rowPlusOne]["squares"][testSquareNum]) {
                    leftDiagNear = rows[rowPlusOne]["squares"][testSquareNum];
                    if (leftDiagNear.checker === null) {
                      this.moves.push(
                        new Move(
                          rows,
                          new Square(
                            +rowNum,
                            +squareNum,
                            new Checker(this.color, isKing)
                          ),
                          new Square(rowPlusOne, testSquareNum)
                        )
                      );
                    }
                  }

                  testSquareNum = +squareNum + 4;

                  if (rows[rowPlusOne]["squares"][testSquareNum]) {
                    rightDiagNear = rows[rowPlusOne]["squares"][testSquareNum];
                    if (rightDiagNear.checker === null) {
                      this.moves.push(
                        new Move(
                          rows,
                          new Square(
                            +rowNum,
                            +squareNum,
                            new Checker(this.color, isKing)
                          ),
                          new Square(rowPlusOne, testSquareNum)
                        )
                      );
                    }
                  }
                } else {
                  // row is even
                  testSquareNum = +squareNum + 4;

                  if (rows[rowPlusOne]["squares"][testSquareNum]) {
                    leftDiagNear = rows[rowPlusOne]["squares"][testSquareNum];
                    if (leftDiagNear.checker === null) {
                      this.moves.push(
                        new Move(
                          rows,
                          new Square(
                            +rowNum,
                            +squareNum,
                            new Checker(this.color, isKing)
                          ),
                          new Square(rowPlusOne, testSquareNum)
                        )
                      );
                    }
                  }

                  testSquareNum = +squareNum + 3;

                  if (rows[rowPlusOne]["squares"][testSquareNum]) {
                    rightDiagNear = rows[rowPlusOne]["squares"][testSquareNum];
                    if (rightDiagNear.checker === null) {
                      this.moves.push(
                        new Move(
                          rows,
                          new Square(
                            +rowNum,
                            +squareNum,
                            new Checker(this.color, isKing)
                          ),
                          new Square(rowPlusOne, testSquareNum)
                        )
                      );
                    }
                  }
                }
              }
            }

            if (this.color === "red" || isKing) {
              if (rowMinusOne > 0) {
                if (rowIsOdd) {
                  testSquareNum = +squareNum - 3;

                  if (rows[rowMinusOne]["squares"][testSquareNum]) {
                    leftDiagNear = rows[rowMinusOne]["squares"][testSquareNum];
                    if (leftDiagNear.checker === null) {
                      this.moves.push(
                        new Move(
                          rows,
                          new Square(
                            +rowNum,
                            +squareNum,
                            new Checker(this.color, isKing)
                          ),
                          new Square(rowMinusOne, testSquareNum)
                        )
                      );
                    }
                  }

                  testSquareNum = +squareNum - 4;

                  if (rows[rowMinusOne]["squares"][testSquareNum]) {
                    rightDiagNear = rows[rowMinusOne]["squares"][testSquareNum];
                    if (rightDiagNear.checker === null) {
                      this.moves.push(
                        new Move(
                          rows,
                          new Square(
                            +rowNum,
                            +squareNum,
                            new Checker(this.color, isKing)
                          ),
                          new Square(rowMinusOne, testSquareNum)
                        )
                      );
                    }
                  }
                } else {
                  // row is even
                  testSquareNum = +squareNum - 4;

                  if (rows[rowMinusOne]["squares"][testSquareNum]) {
                    leftDiagNear = rows[rowMinusOne]["squares"][testSquareNum];
                    if (leftDiagNear.checker === null) {
                      this.moves.push(
                        new Move(
                          rows,
                          new Square(
                            +rowNum,
                            +squareNum,
                            new Checker(this.color, isKing)
                          ),
                          new Square(rowMinusOne, testSquareNum)
                        )
                      );
                    }
                  }

                  testSquareNum = +squareNum - 5;

                  if (rows[rowMinusOne]["squares"][testSquareNum]) {
                    rightDiagNear = rows[rowMinusOne]["squares"][testSquareNum];
                    if (rightDiagNear.checker === null) {
                      this.moves.push(
                        new Move(
                          rows,
                          new Square(
                            +rowNum,
                            +squareNum,
                            new Checker(this.color, isKing)
                          ),
                          new Square(rowMinusOne, testSquareNum)
                        )
                      );
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

Player.prototype.clearJumps = function () {
  this.jumps = [];
};

Player.prototype.clearMoves = function () {
  this.moves = [];
};

Player.prototype.clearActiveSquares = function () {
  this.activeSquares = [];
};

Player.prototype.decrementPieceCount = function () {
  this.pieceCount--;
};

Player.prototype.incrementTurnCount = function () {
  this.turnCount++;
};

Player.prototype.deselectSquares = function (modifier = "start") {
  if (modifier !== "start") {
    this.endSquare = null;
  } else {
    this.startSquare = null;
    this.endSquare = null;
  }
};

Player.prototype.selectSquare = function (square) {
  if (square.checker) {
    this.deselectSquares();
    this.startSquare = square;
  } else {
    this.deselectSquares("end");
    this.endSquare = square;
  }
};

Player.prototype.updateActiveSquares = function (square = null) {
  const jumps = this.jumps;
  const moves = this.moves;
  let uniqueSquareNums = new Set();
  let startSquareNum, endSquareNum;
  this.clearActiveSquares();
  if (square) this.selectSquare(square);
  if (jumps.length) {
    jumps.forEach((jump) => {
      startSquareNum = jump.start.squareNum;
      endSquareNum = jump.end.squareNum;

      if (!uniqueSquareNums.has(startSquareNum)) {
        uniqueSquareNums.add(startSquareNum);
        this.activeSquares.push(jump.start);
      }

      if (this.startSquare) {
        if (startSquareNum === this.startSquare.squareNum) {
          if (!uniqueSquareNums.has(endSquareNum)) {
            uniqueSquareNums.add(endSquareNum);
            this.activeSquares.push(jump.end);
          }
        }
      }
    });
  } else if (moves.length) {
    moves.forEach((move) => {
      startSquareNum = move.start.squareNum;
      endSquareNum = move.end.squareNum;

      if (!uniqueSquareNums.has(startSquareNum)) {
        uniqueSquareNums.add(startSquareNum);
        this.activeSquares.push(move.start);
      }

      if (this.startSquare) {
        if (startSquareNum === this.startSquare.squareNum) {
          if (!uniqueSquareNums.has(endSquareNum)) {
            uniqueSquareNums.add(endSquareNum);
            this.activeSquares.push(move.end);
          }
        }
      }
    });
  }
};

Player.prototype.endTurn = function () {
  this.deselectSquares();
  this.clearActiveSquares();
  this.clearMoves();
  this.clearJumps();
  this.incrementTurnCount();
};
