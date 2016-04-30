import React, { Component } from 'react';
import Checkbox from 'material-ui/lib/checkbox';
import Divider from 'material-ui/lib/divider';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

const moment = require('moment');

export default class TodoGroup extends Component {
  render() {
    const { title, todos, onToggle, onDestroy, onDateChange } = this.props;
    const formatDate = (date) => moment(date).format('ddd, MMM D');
    return (
      <div>
        <List subheader={title}>
        {todos.map(todo => {
          var secondaryText;
          if (todo.completedAt) {
            secondaryText = formatDate(todo.completedAt);
          }

          var checkbox;
          if (onToggle) {
            checkbox = <Checkbox
              defaultChecked={!!todo.completedAt}
              onCheck={() => onToggle(todo)}
            />;
          }

          const iconButtonElement = (
            <IconButton touch={true}>
              <MoreVertIcon />
            </IconButton>
          );

          const rightIconMenu = (
            <IconMenu iconButtonElement={iconButtonElement}>
              <MenuItem>-1 day</MenuItem>
              <MenuItem>+1 day</MenuItem>
              <MenuItem>Edit</MenuItem>
              <MenuItem>Delete</MenuItem>
            </IconMenu>
          );

          return (
            <ListItem
              key={todo.id}
              primaryText={todo.text}
              secondaryText={secondaryText}
              leftCheckbox={checkbox}
              rightIconButton={rightIconMenu}
            />);
        })}
        </List>
        <Divider />
      </div>
    );
  }
}
