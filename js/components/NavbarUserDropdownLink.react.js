import React, { Component } from 'react';
import Link from './Link.react';

export default class Header extends Component {
  render() {
    const name = 'Michael Smith';
    return (
      <a href='#' className='dropdown-toggle' data-toggle='dropdown' role='button'>
        {name}
         <span className='caret' />
      </a>
    );
  }
}
