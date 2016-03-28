import React, { Component } from 'react';
import io from 'socket.io-client';
const serverURL = 'http://localhost:3090';
const socket = io(serverURL);

import Menu from './Menu';
import Board from './Board';
import Status from './Status';

const defaultState = {
  waiting: false,
  currentlyPlaying: false,
  me:          {name: '', symbol: ''},
  otherPlayer: {name: '', symbol: ''},
  whoseTurn:   null,
  boardLayout: [[0,0,0],[0,0,0],[0,0,0]],
  gameId:      null,
  winner:      ''
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = defaultState;
  }

  componentDidMount() {
    socket.on('game created', this.gameCreated.bind(this));
    socket.on('join success', this.joinSuccess.bind(this));
    socket.on('player disconnect', this.playerDisconnect.bind(this));
    socket.on('move made', this.moveMade.bind(this));
    socket.on('game over', this.gameOver.bind(this));
  }

  onJoinQueue(playerName) {
    socket.emit('join queue', { name: playerName });
  }

  joinSuccess(success) {
    if (success) {
      this.setState({waiting: true});
    }
    else { return alert('There was an error joining the queue'); }
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
      gameId:      data.gameId
    });
    console.log(this.state);
  }

  makeMove(move) {
    // move should be:
    // { gameId: 123456, coords: {x:0, y:0}, playerId: '/#kaljsdfgi' }
    const moveData = {
      gameId: this.state.gameId,
      coords: move,
      player: this.state.me
    };
    console.log(moveData);
    socket.emit('make move', moveData);
  }

  moveMade(moveResponse) {
    this.setState({
      whoseTurn: moveResponse.whoseTurn,
      boardLayout: moveResponse.newLayout
    });
  }

  gameOver(winner) {
    this.setState({ winner: winner });
    setTimeout(() => {
      this.setState(defaultState);
    }, 3000);
  }

  onEndGame() {
    // Disconnect socket which will notify other player
    // then reconnect again to play another game
    socket.disconnect();
    socket.connect();
    this.setState(defaultState);
  }

  playerDisconnect() {
    console.log('Other player disconnected');
    this.setState(defaultState);
  }

  render() {
    return (
      <div className="app">
        <h1>Tic Tac Toe</h1>
        <div className="play-area">
          <Menu onJoinQueue={this.onJoinQueue}
                onEndGame={this.onEndGame.bind(this)}
                {...this.state} />
          <Board key={this.state.gameId}
                 makeMove={this.makeMove.bind(this)}
                 {...this.state} />
        </div>
        <Status winner={this.state.winner.name} />
      </div>
    );
  }
}
