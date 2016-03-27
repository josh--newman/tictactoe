import React, { Component, PropTypes } from 'react';

export default class Menu extends Component {


  render() {
    return (
      <div className='menu'>
        <input type='text' placeholder='Enter name'/>
        <button>Start</button>

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
