import { expect } from 'chai';
import io from 'socket.io-client';

const port = process.env.PORT || 3090;
const socketURL = 'http://localhost:' + port;

const options = {
  transports: ['websocket'],
  'force new connection': true
};

const player1 = { 'name': 'Josh' };
const player2 = { 'name': 'Bill' };

describe('Socket communication', () => {
  it('Should do something on connection', () => {
    const client = io.connect(socketURL, options);
  });
});
