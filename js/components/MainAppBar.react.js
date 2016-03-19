import React, { Component } from 'react';
import AppBar from 'material-ui/lib/app-bar';

export default class MainAppBar extends Component {
  render() {
    const { iconElementRight } = this.props;
    return (<AppBar
      title='Did it'
      iconElementRight={iconElementRight}
    />)
  }
}
