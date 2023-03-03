function Checker(color = "black", isKing = false) {
  this.color = color;
  this.isKing = isKing;
}

Checker.prototype.draw = function () {
  const checker = document.createElement("div");
  checker.classList.add("checker");
  checker.classList.add(this.color);
  if (this.isKing) checker.classList.add("king");
  return checker;
};

Checker.prototype.crown = function () {
  this.isKing = true;
};
