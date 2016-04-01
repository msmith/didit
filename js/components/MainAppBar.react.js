import React, { Component } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';

import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import NavigationMenu from 'material-ui/lib/svg-icons/navigation/menu';
import { Link } from 'react-router';

export default class MainAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  render() {
    const handleToggle = () => this.setState({open: !this.state.open});

    const handleClose = () => this.setState({open: false});

    const { iconElementRight } = this.props;
    const iconElementLeft = <IconButton
      onClick={handleToggle}
    >
      <NavigationMenu />
    </IconButton>

    return (
      <div>
        <AppBar
          title='Did it'
          iconElementLeft={iconElementLeft}
          iconElementRight={iconElementRight}
          onLeftIconButtonTouchTap={this.handleToggle}
        />
        <LeftNav
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={open => this.setState({open})}
        >
          <MenuItem onTouchTap={handleClose}>
            <Link to={'/'}>To Do </Link>
          </MenuItem>
          <MenuItem onTouchTap={handleClose}>
            <Link to={'/today'}>Standup</Link>
          </MenuItem>
        </LeftNav>
      </div>
    )
  }
}
