import React, { Component } from 'react';
var lodash = require('lodash');

export default class FaIcon extends Component {
  render() {
    const classNames = lodash.map(this.props.icon.split(' '), function(str) { return 'fa-' + str; });
    const className = 'fa ' + classNames.join(' ')
    return (
      <i className={className}></i>
    )
  }
}
