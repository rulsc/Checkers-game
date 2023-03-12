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
  const game = self.game;
  let move, jump, isKing;
  if (player.moves.length) {
    for (let i = 0; i < player.moves.length; i++) {
      move = player.moves[i];
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
  } else if (player.jumps.length) {
    for (let i = 0; i < player.jumps.length; i++) {
      jump = player.jumps[i];
      if (
        jump.start.squareNum === player.startSquare.squareNum &&
        jump.end.squareNum === player.endSquare.squareNum
      ) {
        isKing = jump.start.checker.isKing;
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
          player.updateActiveSquares.call(player, player.startSquare);
          self.removeAllListeners();
          return self.attachInitialListeners(player);
        } else {
          player.endTurn();
          self.removeAllListeners();
          game.nextTurn();
          break;
        }
      }
    }
  }
};

EventManager.prototype.attachModalListeners = function () {
  const self = this;
  const game = self.game;
  const resetBtn = document.getElementsByTagName("button")[0];
  const closeBtn = document.getElementsByTagName("button")[1];
  const span = document.getElementsByClassName("close")[0];
  const modal = document.getElementById("myModal");

  resetBtn.addEventListener("click", function () {
    modal.style.display = "none";
    game.restart();
  });

  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  span.addEventListener("click", function () {
    modal.style.display = "none";
  });
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
