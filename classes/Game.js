function Game(data) {
  this.data = data;
  this.dataCopy = JSON.parse(JSON.stringify(data));
  this.players = {
    1: new Player(this.data.players[1].color, this.data.players[1].isActive),
    2: new Player(this.data.players[2].color, this.data.players[2].isActive),
  };
  this.board = new Board(this.data.rows);
  this.eMan = new EventManager(this);
}

Game.prototype.restart = function () {
  this.board.clear();
  this.data = JSON.parse(JSON.stringify(this.dataCopy));
  this.players = {
    1: new Player(this.data.players[1].color, this.data.players[1].isActive),
    2: new Player(this.data.players[2].color, this.data.players[2].isActive),
  };
  this.board = new Board(this.data.rows);
  this.init();
};

Game.prototype.init = function () {
  this.basicAI = new BasicAI(this.players[1]);
  this.players[1].isAI = true;
  this.board.draw();
  this.start();
};

Game.prototype.getActivePlayer = function () {
  const players = this.players;
  let isActive;
  for (const playerNum in players) {
    isActive = players[playerNum].isActive;
    if (isActive) {
      return players[playerNum];
    }
  }
};

Game.prototype.getInactivePlayer = function () {
  const players = this.players;
  let isActive;
  for (const playerNum in players) {
    isActive = players[playerNum].isActive;
    if (!isActive) {
      return players[playerNum];
    }
  }
};

Game.prototype.toggleActivePlayer = function () {
  const players = this.players;
  let isActive;
  for (const playerNum in players) {
    isActive = players[playerNum].isActive;
    if (isActive) {
      players[playerNum].isActive = false;
    } else {
      players[playerNum].isActive = true;
    }
  }
};

Game.prototype.nextTurn = function () {
  const self = this;
  const eMan = self.eMan;
  let activePlayer;
  self.toggleActivePlayer();
  activePlayer = self.getActivePlayer();
  activePlayer.findJumps(self.data.rows);
  if (!activePlayer.jumps.length) {
    activePlayer.findMoves(self.data.rows);

    if (!activePlayer.moves.length) {
      if (
        confirm(
          `Player ${
            self.getInactivePlayer().color
          } is the winner! Thanks for playing.\nTry again?`
        )
      )
        this.restart();
    } else {
      activePlayer.updateActiveSquares();
      eMan.attachInitialListeners(activePlayer);
      if (activePlayer.isAI) {
        this.basicAI.move();
      }
    }
  } else {
    activePlayer.updateActiveSquares();
    eMan.attachInitialListeners(activePlayer);
    if (activePlayer.isAI) {
      this.basicAI.move();
    }
  }
};

Game.prototype.start = function () {
  const self = this;
  const eMan = self.eMan;
  let activePlayer;
  activePlayer = self.getActivePlayer();
  activePlayer.findMoves(self.data.rows);
  activePlayer.updateActiveSquares();
  eMan.attachInitialListeners(activePlayer);
  if (activePlayer.isAI) {
    this.basicAI.move();
  }
};
