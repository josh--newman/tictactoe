import { expect } from 'chai';
import Game from '../core/game';

describe('Game', () => {
  let game;

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
    
    expect(game.id).to.exist;
  });
});
