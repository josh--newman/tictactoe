import React, { Component, PropTypes } from 'react';

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
    return (
      <div className="tile"
           onClick={this.handleClick.bind(this)}>
        {this.renderTileImage()}
      </div>
    );
  }
}
