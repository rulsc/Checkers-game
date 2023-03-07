function BasicAI(player) {
  this.player = player;
}

//BasicAI.prototype.raiseCover = function () {};

BasicAI.prototype.move = function () {
  const player = this.player;
  const intervalId = setInterval(function () {
    if (player.isActive) {
      let activeSquares = [...document.getElementsByClassName("highlight")];
      let randomNum = Math.floor(
        Math.random() * (activeSquares.length - 1) + 1
      );
      let activeEmptySquares = [];
      activeSquares[randomNum - 1].click();
      activeSquares = [...document.getElementsByClassName("highlight")];
      activeEmptySquares = [];
      activeSquares.forEach((el) => {
        if (!el.firstChild) {
          activeEmptySquares = [...activeEmptySquares, el];
        }
      });
      randomNum = Math.floor(
        Math.random() * (activeEmptySquares.length - 1) + 1
      );
      activeEmptySquares[randomNum - 1].click();
    } else {
      clearInterval(intervalId);
    }
  }, 1000);
};
