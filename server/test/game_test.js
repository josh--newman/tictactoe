import { expect } from 'chai';
import Game from '../core/game';

describe('Game', () => {
  let game;
  const player1 = {
    id: 1234,
    name: 'Josh',
    symbol: 'X'
  };
  const player2 = {
    id: 5678,
    name: 'Bill',
    symbol: 'O'
  };

  beforeEach(() => {
    const player1 = {
      id: 1234,
      name: 'Josh',
    };
    const player2 = {
      id: 5678,
      name: 'Bill',
    };
    game = new Game(player1, player2, 3);
  });

  it('setup is successful', () => {
    expect(game.player1).to.exist;
    expect(game.player2).to.exist;
    expect(game.whoseTurn).to.eql(game.player1.id);
    expect(game.board).to.exist;
    expect(game.id).to.exist;
    expect(game.gameOver).to.equal(false);
    expect(game.winner).to.not.exist;
  });

  it('assigns correct symbols to players', () => {
    expect(game.player1.symbol).to.equal('X');
    expect(game.player2.symbol).to.equal('O');
  });

  it('changes turns when a move is made', () => {
    game.move(player1, {x: 0, y: 0});
    expect(game.whoseTurn).to.eql(player2.id);

    game.move(player2, {x: 2, y: 2});
    expect(game.whoseTurn).to.eql(player1.id);
  });

  it('rejects a move if out of turn', () => {
    const moveFunc = game.move.bind(game, player2, {x: 2, y: 1});
    expect(moveFunc).to.throw(Error, /Move out of turn not allowed/);
  });

  describe('when game is over', () => {
    let board;
    beforeEach(() => {
      board = [
        ['X','X', 0],
        ['O','X','O'],
        ['O','O', 0]
      ];
    });

    it('determines when game is finished', () => {
      game.board.squares = board;
      game.move(player1, {x: 2, y: 2});

      expect(game.gameOver).to.equal(true);
      expect(game.winner).to.eql(player1);
    });

    it('rejects more moves', () => {
      game.board.squares = board;
      game.move(player1, {x: 2, y: 2});

      const gameOverMove = game.move.bind(game, player1, {x: 2, y: 2});
      expect(gameOverMove).to.throw(Error, /Game over/);
    });
  });


});
