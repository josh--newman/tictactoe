var Board = require('./board.js');

function Game(player1, player2, size) {
  this.player1 = {
    id: player1.id,
    name: player1.name,
    symbol: 'X'
  };
  this.player2 = {
    id: player2.id,
    name: player2.name,
    symbol: 'O'
  };
  this.whoseTurn = this.player1.id;
  this.board = new Board(size);
  this.id = Date.now(); // use the millisecond count as an id
  this.gameOver = false;
  this.winner = undefined;
}

Game.prototype.move = function(player, coords) {
  // If game is over, reject move
  if (this.gameOver) { throw Error('Game over!'); }
  // if this player is moving out of turn, reject move
  if (player.id !== this.whoseTurn) { throw Error('Move out of turn not allowed'); }

  // Change the board
  this.board.move(coords.x, coords.y, player.symbol);

  // Update whoseTurn
  this.whoseTurn = player.id === this.player1.id ? this.player2.id : this.player1.id;

  // Update if game over
  if (this.board.winningSymbol === this.player1.symbol) {
    this.gameOver = true;
    this.winner = this.player1;
  }
  else if (this.board.winningSymbol === this.player2.symbol) {
    this.gameOver = true;
    this.winner = this.player2;
  }
};


module.exports = Game;
