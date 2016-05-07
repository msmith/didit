import React, { Component } from 'react';
import { Link } from 'react-router';

// Material-UI components
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';

// Material-UI icons
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

export default class MainAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  render() {
    const handleToggle = () => this.setState({open: !this.state.open});

    const handleClose = () => this.setState({open: false});

    const { title, iconElementRight } = this.props;
    const iconElementLeft = <IconButton
      onClick={handleToggle}
    >
      <NavigationMenu />
    </IconButton>

    return (
      <div>
        <AppBar
          title={title}
          iconElementLeft={iconElementLeft}
          iconElementRight={iconElementRight}
          onLeftIconButtonTouchTap={this.handleToggle}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={open => this.setState({open})}
        >
          <Link to={'/'} className='menu-link'>
            <MenuItem onTouchTap={handleClose}>
              To do
            </MenuItem>
          </Link>
          <Link to={'/completed'} className='menu-link'>
            <MenuItem onTouchTap={handleClose}>
              Completed
            </MenuItem>
          </Link>
          <Link to={'/archives'} className='menu-link'>
            <MenuItem onTouchTap={handleClose}>
              Archives
            </MenuItem>
          </Link>
        </Drawer>
      </div>
    )
  }
}
