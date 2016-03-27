import React, { Component, PropTypes } from 'react';

export default class Status extends React.Component {
  render() {
    return (
      <div className="status">
        <p>{this.props.winner}</p>
      </div>
    );
  }
}
