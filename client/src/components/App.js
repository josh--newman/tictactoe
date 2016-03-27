import React, { Component } from 'react';
import io from 'socket.io-client';
const serverURL = 'http://localhost:3090';
const socket = io(serverURL);

import Menu from './Menu';
import Board from './Board';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      waiting: false,
      currentlyPlaying: false,
      player1:     {},
      player2:     {},
      whoseTurn:   null,
      boardLayout: [],
      gameId:      null
    };
  }

  componentDidMount() {
    socket.on('game created', (data) => {
      console.log(data);
      this.setState({
        waiting: false,
        currentlyPlaying: true,
        player1:     data.player1,
        player2:     data.player2,
        whoseTurn:   data.whoseTurn,
        boardLayout: data.boardLayout,
        gameId:      data.id
      });
      console.log(this.state);
    });

    socket.on('join success', (success) => {
      if (success) {
        this.setState({waiting: true});
      }
      else { return alert('There was an error joining the queue'); }
    });
  }

  onJoinQueue(playerName) {
    socket.emit('join queue', { name: playerName });
  }

  render() {
    return (
      <div className="app">
        <h1>Tic Tac Toe</h1>
        <div className="play-area">
          <Menu onJoinQueue={this.onJoinQueue}
                currentlyPlaying={this.state.currentlyPlaying}
                waiting={this.state.waiting} />
              <Board key={this.state.gameId}/>
        </div>
      </div>
    );
  }
}
