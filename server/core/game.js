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
  this.board = new Board(size);
  this.id = Date.now(); // use the millisecond count as an id
}

module.exports = Game;
