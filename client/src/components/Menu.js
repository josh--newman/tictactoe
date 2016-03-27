import React, { Component, PropTypes } from 'react';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { playerName: '' };
  }

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
        <form className="start-game" onSubmit={this.handleSubmit.bind(this)}>
          <input
            type='text'
            placeholder='Enter name'
            onChange={this.onKey.bind(this)}
            value={this.state.playerName} />
          <button>Start</button>
        </form>
      );
    }
  }

  onKey(e) {
    this.setState({ playerName: e.target.value });
    console.log(this.state.playerName);
  }

  handleSubmit(e) {
    e.preventDefault();
    const playerName = this.state.playerName;
    this.props.onJoinQueue(playerName);
    this.setState({ playerName: '' });
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
