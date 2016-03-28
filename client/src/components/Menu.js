import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Status from './Status';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { playerName: '' };
  }

  renderStartEnd() {
    if (this.props.currentlyPlaying) {
      return (
        <div className="end-game">
          <button onClick={this.handleEndGame.bind(this)}>End game</button>
        </div>
      );
    }
    else if (this.props.waiting) {
      return (<div className="waiting">Waiting for a player to join the game</div>);
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
  }

  handleSubmit(e) {
    e.preventDefault();
    const playerName = this.state.playerName;
    this.props.onJoinQueue(playerName);
    this.setState({ playerName: '' });
  }

  handleEndGame() {
    this.props.onEndGame();
  }

  render() {
    const playerCardClass = classNames('player-card', {
      'my-turn': this.props.me.id === this.props.whoseTurn
    });
    const otherPlayerClass = classNames('player-card', {
      'other-turn': this.props.otherPlayer.id === this.props.whoseTurn
    });
    return (
      <div className='menu'>
        {this.renderStartEnd()}

        <div className="player-info">
          <h2>Players</h2>
          <hr/>
          <div className={playerCardClass}>
            <span className='name'>{this.props.me.name}</span>
            <span className='symbol'>{this.props.me.symbol}</span>
          </div>
          <div className={otherPlayerClass}>
            <span className='name'>{this.props.otherPlayer.name}</span>
            <span className='symbol'>{this.props.otherPlayer.symbol}</span>
          </div>
        </div>

        <Status message={this.props.message} />
      </div>
    );
  }
}
