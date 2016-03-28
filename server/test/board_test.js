import { expect } from 'chai';
import Board from '../core/board';

describe('Board', () => {

  it('initialises with correct size', () => {
    let board1 = new Board(3);
    expect(board1.size).to.equal(3);
    let board2 = new Board(10);
    expect(board2.size).to.equal(10);
  });

  it('initialises with correct symbols', () => {
    let board = new Board(3);
    expect(board.symbols).to.eql({ X: 'X', O: 'O'});
  });


  it('initialises correct structure', () => {
    const initialSquares = [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ];

    let board = new Board(3);
    expect(board.squares).to.eql(initialSquares);
  });

  it('accepts moves', () => {
    let board = new Board(3);
    const newSquares = [
      ['X',0,0],
      [0,0,0],
      [0,0,0]
    ];

    board.move(0,0,'X');
    expect(board.squares).to.eql(newSquares);
  });

  it('does not accept an invalid move', () => {
    let board = new Board(3);
    let badMove = board.move.bind(board,3,100,'X');
    expect(badMove).to.throw(Error, /Invalid move/);
  });

  it('does not accept an invalid symbol', () => {
    let board = new Board(3);
    let badMove = board.move.bind(board,1,1,'Y');
    expect(badMove).to.throw(Error, /Symbol not supported/);
  });

  describe('winning checks', () => {
    let board;
    beforeEach(() => {
      board = new Board(3);
    });

    it('finds a draw', () => {
      board.squares = [
        ['X','O','X'],
        ['X','O','O'],
        ['O','X','X'],
      ];

      expect(board.checkWin()).to.equal('draw');
    });

    describe('finds a win', () => {
      it('horizontally', () => {
        let board = new Board(3);
        board.squares = [
          ['X','X','X'],
          ['O', 0 ,'O'],
          ['O','X','X']
        ];

        expect(board.checkWin()).to.equal('X');
      });

      it('vertically', () => {
        let board = new Board(3);
        board.squares = [
          ['X','O','X'],
          [ 0 ,'O','O'],
          ['O','O','X']
        ];

        expect(board.checkWin()).to.equal('O');
      });

      it('diagonally', () => {
        let board = new Board(3);
        board.squares = [
          ['X','O','X'],
          [ 0 ,'X','O'],
          ['O','O','X']
        ];

        expect(board.checkWin()).to.equal('X');
      });

      it('anti-diagonally', () => {
        let board = new Board(3);
        board.squares = [
          ['X','O','O'],
          [ 0 ,'O','O'],
          ['O', 0 ,'X']
        ];

        expect(board.checkWin()).to.equal('O');
      });
    });


  });

});
