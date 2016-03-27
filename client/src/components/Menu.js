import React, { Component, PropTypes } from 'react';

export default class Menu extends Component {
  renderStartEnd() {
    if (this.props.currentlyPlaying) {
      return (
        <div className="end-game">
          <button>End game</button>
        </div>
      );
    }
    else {
      return (
        <div className="start-game">
          <input type='text' placeholder='Enter name'/>
          <button>Start</button>
        </div>
      );
    }
  }

  render() {
    return (
      <div className='menu'>
        {this.renderStartEnd()}

        <div className="player-info">
          <h2>Players</h2>
          <div className="player-card">
            <span>{/*this.props.player1.name*/}Josh</span>
            <span>{/*this.props.player1.symbol*/}X</span>
          </div>
          <div className="player-card">
            <span>{/*this.props.player2.name*/}Bill</span>
            <span>{/*this.props.player2.symbol*/}O</span>
          </div>
        </div>
      </div>
    );
  }
}
