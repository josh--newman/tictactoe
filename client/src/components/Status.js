import React, { Component, PropTypes } from 'react';

export default class Status extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="status">
        <p>Status: {this.props.winner}</p>
      </div>
    );
  }
}
