import React, { Component, PropTypes } from 'react';
import Tile from './Tile';
const BOARD_SIZE = 3; // hard coded board size

export default class Board extends Component {
  renderTiles(size) {
    let tiles = [];
    for (let i = 0; i < size; i++) {
      let row = [];
      for (let j = 0; j < size; j++) {
        row.push(
          <Tile pos={{x: i, y: j}}
                value={0}
                makeMove={this.props.makeMove} />
        );
      }
      tiles.push(<div className='board-row'>{row}</div>);
    }
    return tiles;
  }

  render() {
    return (
      <div className="board">
        {this.renderTiles(BOARD_SIZE)}
      </div>
    );
  }
}
