import React, { Component, PropTypes } from 'react';
import Tile from './Tile';
const BOARD_SIZE = 3; // hard coded board size

export default class Board extends Component {
  renderTiles(size) {
    let tiles = [];
    for (let x = 0; x < size; x++) {
      let row = [];
      for (let y = 0; y < size; y++) {
        row.push(
          <Tile pos={{x: x, y: y}}
                value={this.props.layout[x][y]}
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
