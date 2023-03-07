function BasicAI(player) {
  this.player = player;
}

//BasicAI.prototype.raiseCover = function () {};

BasicAI.prototype.move = function () {
  const player = this.player;
  let randomNum;
  let activeSquares;
  let activeEmptySquares;
  const intervalId = setInterval(function () {
    if (player.isActive) {
      activeSquares = [...document.getElementsByClassName("highlight")];
      activeEmptySquares = [];
      randomNum = Math.floor(Math.random() * activeSquares.length);
      activeSquares[randomNum].click();
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
    }
  }, 1000);
};
