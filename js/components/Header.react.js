import React, { Component } from 'react';
import Link from './Link.react';
import NavbarUserDropdownLink from './NavbarUserDropdownLink.react';

export default class Header extends Component {
  render() {
    const logout = () => console.log('logout');
    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <a className='navbar-brand' href='/'>
              Did it 2
            </a>
          </div>
          <ul className='nav navbar-nav navbar-right'>
            <li className='dropdown'>
              <NavbarUserDropdownLink />
              <ul className='dropdown-menu'>
                <li>
                  <Link action={logout} >
                    Sign out
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
