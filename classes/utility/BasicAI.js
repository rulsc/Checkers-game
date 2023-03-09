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
  let randomNum;
  let activeSquares;
  let activeEmptySquares;
  self.raiseCover();
  const intervalId = setInterval(function () {
    if (player.isActive) {
      activeSquares = [...document.getElementsByClassName("highlight")];
      activeEmptySquares = [];
      randomNum = Math.floor(Math.random() * activeSquares.length);
      activeSquares[randomNum].click();
      activeSquares = [];
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
    } else {
      clearInterval(intervalId);
      self.lowerCover();
    }
  }, 500);
};
