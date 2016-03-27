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
    socket.on('game created', this.gameCreated.bind(this));
    socket.on('join success', this.joinSuccess.bind(this));
    socket.on('player disconnect', this.playerDisconnect.bind(this));
  }

  gameCreated(data) {
    console.log(data);
    const myId = `/#${socket.io.engine.id}`;
    const me = data.player1.id === myId ? data.player1 : data.player2;
    const other = myId === data.player1.id ? data.player2 : data.player1;

    this.setState({
      waiting: false,
      currentlyPlaying: true,
      me:          me,
      otherPlayer: other,
      whoseTurn:   data.whoseTurn,
      boardLayout: data.boardLayout,
      gameId:      data.id
    });
    console.log(this.state);
  }

  joinSuccess(success) {
    if (success) {
      this.setState({waiting: true});
    }
    else { return alert('There was an error joining the queue'); }
  }

  onJoinQueue(playerName) {
    socket.emit('join queue', { name: playerName });
  }

  onEndGame() {
    // Disconnect socket which will notify other player
    // then reconnect again to play another game
    socket.disconnect();
    socket.connect();
    this.setState({ currentlyPlaying: false });
  }

  playerDisconnect() {
    console.log('Other player disconnected');
    this.setState({ currentlyPlaying: false });
  }

  render() {
    return (
      <div className="app">
        <h1>Tic Tac Toe</h1>
        <div className="play-area">
          <Menu onJoinQueue={this.onJoinQueue}
                onEndGame={this.onEndGame.bind(this)}
                {...this.state} />
              <Board key={this.state.gameId}/>
        </div>
      </div>
    );
  }
}
