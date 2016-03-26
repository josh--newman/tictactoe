import { expect } from 'chai';
import PlayerQueue from '../core/player_queue';

describe('Player queue', () => {
  it('accepts players', () => {
    const player1 = {
      id: '/#JuD2NocDEVP2V1RzAAAb',
      name: 'Josh',
    };
    const player2 = {
      id: '/#g2db-ZLY3x8yufg4AAAa',
      name: 'Bill',
    };
    let queue = new PlayerQueue(2000);
    queue.addPlayer(player1);
    queue.addPlayer(player2);

    expect(queue.queue).to.eql([player1, player2]);
  });
});
