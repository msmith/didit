import React, { Component } from 'react';
import Link from './Link.react';

export default class Header extends Component {
  render() {
    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <a className='navbar-brand' href='/'>
              Did it 2
            </a>
          </div>
        </div>
      </nav>
    );
  }
}
