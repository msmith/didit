import React, { Component } from 'react';
import Checkbox from 'material-ui/lib/checkbox';
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

export default class TodoList extends Component {
  render() {
    const { title, todos, secondaryText, onToggle, onDestroy, onDateChange, itemRightIcon } = this.props;
    return (
      <div>
        <List subheader={title}>
        {todos.map(todo => {
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

          var rightIconMenu;
          if (onDateChange || onDestroy) {
            rightIconMenu = (
              <IconMenu iconButtonElement={iconButtonElement}>
                { onDateChange &&
                  <MenuItem
                    leftIcon={<NavigationArrowUpward />}
                    onTouchTap={() => onDateChange(todo, -1)}>
                    -1 day
                  </MenuItem>
                }
                { onDateChange &&
                  <MenuItem
                    leftIcon={<NavigationArrowDownward />}
                    onTouchTap={() => onDateChange(todo, 1)}>
                    +1 day
                  </MenuItem>
                }
                { onDestroy &&
                  <MenuItem
                    leftIcon={<ActionDelete />}
                    onTouchTap={() => onDestroy(todo)}>
                    Delete
                  </MenuItem>
                }
              </IconMenu>
            );
          }

          return (
            <ListItem
              key={todo.id}
              primaryText={todo.text}
              secondaryText={secondaryText(todo)}
              leftCheckbox={checkbox}
              rightIconButton={rightIconMenu}
              rightIcon={itemRightIcon && itemRightIcon(todo)}
            />);
        })}
        </List>
      </div>
    );
  }
}
