import React, { Component } from 'react';
import Checkbox from 'material-ui/lib/checkbox';
import Divider from 'material-ui/lib/divider';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

import NavigationArrowUpward from 'material-ui/lib/svg-icons/navigation/arrow-upward';
import NavigationArrowDownward from 'material-ui/lib/svg-icons/navigation/arrow-downward';
import ActionDelete from 'material-ui/lib/svg-icons/action/delete';
import ContentCreate from 'material-ui/lib/svg-icons/content/create';

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
            secondaryText = 'Completed ' + formatDate(todo.completedAt);
          } else {
            secondaryText = 'Added ' + moment(todo.addedAt).fromNow();
          }

          var checkbox;
          if (onToggle) {
            checkbox = <Checkbox
              defaultChecked={!!todo.completedAt}
              onCheck={() => onToggle(todo)}
            />;
          }

          const iconButtonElement = (
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          );

          const rightIconMenu = (
            <IconMenu iconButtonElement={iconButtonElement}>
              <MenuItem
                leftIcon={<ContentCreate />}
                onTouchTap={() => 1}>
                Edit
              </MenuItem>
              <MenuItem
                leftIcon={<NavigationArrowUpward />}
                onTouchTap={() => onDateChange(todo, -1)}>
                -1 day
              </MenuItem>
              <MenuItem
                leftIcon={<NavigationArrowDownward />}
                onTouchTap={() => onDateChange(todo, 1)}>
                +1 day
              </MenuItem>
              <MenuItem
                leftIcon={<ActionDelete />}
                onTouchTap={() => onDestroy(todo)}>
                Delete
              </MenuItem>
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
