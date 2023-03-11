function BasicAI(player) {
  this.player = player;
}

BasicAI.prototype.raiseCover = function () {
  const aiCover = document.getElementById("ai-cover");
  aiCover.classList.add("ai-cover");
};

BasicAI.prototype.lowerCover = function () {
  const aiCover = document.getElementById("ai-cover");
  aiCover.classList.remove("ai-cover");
};

BasicAI.prototype.move = function () {
  const self = this;
  const player = self.player;
  let randomNum, activeSquares, activeCheckerSquares, activeEmptySquares;
  self.raiseCover();
  const intervalId = setInterval(function () {
    if (player.isActive) {
      activeSquares = [...document.getElementsByClassName("highlight")];
      activeCheckerSquares = activeSquares.filter(
        (square) => square.firstChild
      );
      activeEmptySquares = [];
      randomNum = Math.floor(Math.random() * activeCheckerSquares.length);
      activeCheckerSquares[randomNum].click();

      setTimeout(function () {
        activeSquares = [];
        activeCheckerSquares = [];
        activeSquares = [...document.getElementsByClassName("highlight")];
        activeSquares.forEach((el) => {
          if (!el.firstChild) {
            activeEmptySquares.push(el);
          }
        });
        randomNum = Math.floor(Math.random() * activeEmptySquares.length);
        activeEmptySquares[randomNum].click();
        activeSquares = [];
        activeEmptySquares = [];
      }, 500);
    } else {
      clearInterval(intervalId);
      self.lowerCover();
    }
  }, 1000);
};
