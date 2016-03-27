import React, { Component, PropTypes } from 'react';

export default class Tile extends React.Component {
  handleClick() {
    this.props.makeMove(this.props.pos);
  }

  render() {
    return (
      <div className="tile"
           onClick={this.handleClick.bind(this)}>
        <span>{this.props.value}</span>
      </div>
    );
  }
}
