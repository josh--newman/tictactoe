import { expect } from 'chai';
import io from 'socket.io-client';

const port = process.env.PORT || 3090;
const socketURL = 'http://localhost:' + port;

describe('Socket communication', () => {
  let server;

  const player1 = { 'name': 'Josh' };
  const player2 = { 'name': 'Bill' };
  const options = {
    transports: ['websocket'],
    'force new connection': true
  };

  beforeEach((done) => {
    // start server
    server = require('../index.js').server;
    done();
  });

  it.skip('registers a new player', (done) => {
    const client = io.connect(socketURL, options);

    client.once('connect', (data) => {
      client.once('join queue', (message) => {
        expect(message).to.equal('Joined');

        client.disconnect();
        done();
      });

      client.emit('join queue', player1);
    });

  });
});
