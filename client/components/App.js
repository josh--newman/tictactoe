import React, { Component } from 'react';
import io from 'socket.io-client';

export default class App extends Component {
  componentDidMount() {
    const clientSocket = io();
    clientSocket.emit('join queue', { name: "Josh" });
  }

  render() {
    return (
      <div className="app">
        <h1>Tic Tac Toe</h1>
      </div>
    );
  }
}
