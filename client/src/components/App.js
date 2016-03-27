import React, { Component } from 'react';
import io from 'socket.io-client';
const serverURL = 'http://localhost:3090';
const socket = io(serverURL);

import Menu from './Menu';
import Board from './Board';

export default class App extends Component {
  componentDidMount() {
    // socket.on('game created', (data) => {
    //   console.log(data);
    // });
  }

  onJoinQueue(playerName) {
    socket.emit('join queue', { name: playerName }, (result) => {
      if (!result) { return alert('there was an error joining the queue'); }
    });
  }

  render() {
    return (
      <div className="app">
        <h1>Tic Tac Toe</h1>
        <div className="play-area">
          <Menu onJoinQueue={this.onJoinQueue}/>
          <Board />
        </div>
      </div>
    );
  }
}
