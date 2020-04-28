import React, { Component } from 'react';
import { render } from 'react-dom';

class Try extends Component {
  render() {
    return (
      <li>
        <div>{this.props.tryInfo.try}</div>
        <div>{this.props.tryInfo.result}</div>
      </li>
    )
  }
}

export default Try;