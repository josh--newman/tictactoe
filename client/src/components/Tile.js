import React, { Component, PropTypes } from 'react';

export default class Tile extends React.Component {
  render() {
    return (
      <div className="tile" onClick={this.props.handleClick}>
        <span>{this.props.value}</span>
      </div>
    );
  }
}
