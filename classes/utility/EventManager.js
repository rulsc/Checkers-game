function EventManager(game) {
  this.game = game;
}

EventManager.prototype.attachInitialListeners = function (player) {
  const self = this;
  const squares = player.activeSquares;
  let el = null;

  self.attachSelectionListeners(player);

  squares.forEach((square) => {
    el = document.querySelector(`[data-square-num=\"${square.squareNum}\"]`);
    el.addEventListener("click", function (e) {
      e.stopImmediatePropagation();
      self.attachSelectionListeners(player);
    });

    el.classList.add("highlight");
  });
};

EventManager.prototype.attachSelectionListeners = function (player) {
  const self = this;
  const squares = player.activeSquares;
  let el = null;

  document.querySelectorAll(".highlight").forEach((el) => {
    if (!el.firstChild) self.removeAllListeners(el);
  });

  squares.forEach((square) => {
    el = document.querySelector(`[data-square-num=\"${square.squareNum}\"]`);
    el.classList.add("highlight");

    if (el.firstChild) {
      el.addEventListener("click", function (e) {
        e.stopPropagation();
        player.updateActiveSquares.call(player, square);
      });
    } else {
      el.addEventListener("click", function (e) {
        e.stopPropagation();
        player.updateActiveSquares.call(player, square);
        self.attachMovementListeners(player);
      });
    }
  });
};

EventManager.prototype.attachMovementListeners = function (player) {
  const self = this;
  const game = this.game;
  let jumps = player.jumps;
  let moves = player.moves;
  let move;
  let jump;
  let isKing;
  if (moves.length) {
    for (let i = 0; i < moves.length; i++) {
      move = moves[i];
      if (
        move.start.squareNum === player.startSquare.squareNum &&
        move.end.squareNum === player.endSquare.squareNum
      ) {
        move.execute();
        player.endTurn();
        self.removeAllListeners();
        game.nextTurn();
        break;
      }
    }
  } else if (jumps.length) {
    for (let i = 0; i < jumps.length; i++) {
      jump = jumps[i];
      if (
        jump.start.squareNum === player.startSquare.squareNum &&
        jump.end.squareNum === player.endSquare.squareNum
      ) {
        isKing = player.startSquare.checker.isKing;
        jump.execute();
        player.deselectSquares();
        player.clearJumps();
        player.clearActiveSquares();

        if (isKing !== jump.end.checker.isKing) {
          player.endTurn();
          self.removeAllListeners();
          game.nextTurn();
          return;
        }

        player.startSquare = jump.end;
        player.findJumps(game.data.rows);
        if (player.jumps.length) {
          player.updateActiveSquares.call(player, jump.end);
          self.removeAllListeners();
          return self.attachInitialListeners(player);
        } else {
          player.endTurn();
          self.removeAllListeners();
          game.nextTurn();
        }
      }
    }
  }
};

EventManager.prototype.removeAllListeners = function (elem = null) {
  if (elem) {
    elem.classList.remove("highlight");
    elem.replaceWith(elem.cloneNode(true));
  } else {
    document.querySelectorAll(".highlight").forEach((el) => {
      el.classList.remove("highlight");
      el.replaceWith(el.cloneNode(true));
    });
  }
};
