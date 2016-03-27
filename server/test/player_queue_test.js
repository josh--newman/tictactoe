import { expect } from 'chai';
import PlayerQueue from '../core/player_queue';

describe('Player queue', () => {
  const player1 = {
    id: '/#JuD2NocDEVP2V1RzAAAb',
    name: 'Josh',
  };
  const player2 = {
    id: '/#g2db-ZLY3x8yufg4AAAa',
    name: 'Bill',
  };
  let queue;

  beforeEach(() => {
    queue = new PlayerQueue();
    queue.addPlayer(player1);
    queue.addPlayer(player2);
  });

  it('accepts players', () => {
    expect(queue.queue).to.eql([player1, player2]);
  });

  it('removes a player', () => {
    queue.removePlayer(player1.id);
    expect(queue.queue).to.eql([player2]);
  });
});
