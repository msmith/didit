import React, { Component } from 'react';
import { Link } from 'react-router';

// Material-UI components
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

// Material-UI icons
import Check from 'material-ui/svg-icons/navigation/check';
import List from 'material-ui/svg-icons/action/list';

export default class MainAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  render() {
    const { title, iconElementRight } = this.props;

    const handleOpen = () => this.setState({open: !this.state.open});

    return (
      <div>
        <AppBar
          title={title}
          iconElementRight={iconElementRight}
          onLeftIconButtonTouchTap={handleOpen}
          showMenuIconButton
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={open => this.setState({open})}
        >
          <Link to={'/'} className="menu-link">
            <MenuItem
              primaryText="To do"
              leftIcon={<List />} />
          </Link>
          <Link to={'/completed'} className="menu-link">
            <MenuItem
              primaryText="Completed"
              leftIcon={<Check />} />
          </Link>
        </Drawer>
      </div>
    );
  }
}
