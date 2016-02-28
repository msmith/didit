import React, { Component } from 'react';

export default class Link extends Component {
  render() {
    const { action } = this.props;
    const handleClick = (e) => {
      e.preventDefault();
      action();
    }
    return (
      <a onClick={handleClick} href='#' >
        {this.props.children}
      </a>
    );
  }
}
