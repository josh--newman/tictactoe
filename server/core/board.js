// Board ------
function Board(size) {
  if(size < 3) { throw Error('Board cannot be smaller than 3x3'); }
  this.symbols = { X: 'X', O: 'O'};
  this.winningSymbol = undefined;
  this.size = size;
  this.squares = this.buildBoard();
}

// Builds the board in 2D array
Board.prototype.buildBoard = function() {
  var squares = [];

  for (var i = 0; i < this.size; i++) {
    var row = [];
    for (var j = 0; j < this.size; j++) {
      row.push(0);
    }
    squares.push(row);
  }

  return squares;
};

Board.prototype.move = function(x, y, symbol) {
  // make sure co-ords are within limits
  if (x >= this.size || y >= this.size) { throw Error('Invalid move'); }
  if (!this.symbols[symbol]) { throw Error('Symbol not supported'); }

  // update spot if it's empty
  if (this.squares[x][y] === 0) {
    this.squares[x][y] = symbol;
  }
  else { throw Error('Space already taken'); }

  // Check for winner
  this.winningSymbol = this.checkWin();
};

// Returns the symbol of the winner
Board.prototype.checkWin = function() {
  var currSym, i, j;

  // Check rows
  for (i = 0; i < this.size; i++) { // row
    currSym = this.squares[i][0];
    for (j = 0; j < this.size; j++)  { // left to right
      if(this.squares[i][j] !== currSym) { break; }
      if(j === this.size - 1) { return currSym; } // end of the row
    }
  }

  // Check columns
  for (i = 0; i < this.size; i++) { // col
    currSym = this.squares[0][i];
    for (j = 0; j < this.size; j++)  { // top to bottom
      if(this.squares[j][i] !== currSym) { break; }
      if(j === this.size - 1) { return currSym; } // end of the row
    }
  }

  // Check diagonal
  for (i = 0; i < this.size; i++) {
    currSym = this.squares[0][0];
    if(this.squares[i][i] !== currSym) { break; }
    if (i === this.size - 1) { return currSym; }
  }

  // Check anti-diagonal
  for (i = 0, j = this.size - 1; i < this.size; i++, j--) {
    currSym = this.squares[0][this.size - 1];
    if(this.squares[i][j] !== currSym) { break; }
    if (i === this.size - 1) { return currSym; }
  }

  // Check draw
  var foundEmpty = false;
  for (i = 0; i < this.size; i++) {
    for (j = 0; j < this.size; j++) {
      if (this.squares[i][j] === 0) {
        foundEmpty = true;
        continue;
      }
    }
  }
  if(!foundEmpty) { return 'draw'; }


};

module.exports = Board;
