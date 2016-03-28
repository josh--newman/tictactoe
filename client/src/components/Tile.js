import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class Tile extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    this.props.makeMove(this.props.pos);
  }

  renderTileImage() {
    if (this.props.value === 0) {
      return <p></p>;
    } else {
      return <p>{this.props.value}</p>;
    }
  }

  render() {
    const tileClass = classNames('tile', {
      'game-disabled': this.props.value !== 0
    });
    return (
      <div className={tileClass}
           onClick={this.handleClick.bind(this)}>
        {this.renderTileImage()}
      </div>
    );
  }
}
