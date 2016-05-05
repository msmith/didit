import React, { Component } from 'react';
import Checkbox from 'material-ui/lib/checkbox';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

export default class TodoList extends Component {
  render() {
    const { title, todos, secondaryText, onToggle, onDestroy, onDateChange, itemRightIcon, itemRightIconButton } = this.props;
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

          return (
            <ListItem
              key={todo.id}
              primaryText={todo.text}
              secondaryText={secondaryText(todo)}
              leftCheckbox={checkbox}
              rightIconButton={itemRightIconButton && itemRightIconButton(todo)}
              rightIcon={itemRightIcon && itemRightIcon(todo)}
            />);
        })}
        </List>
      </div>
    );
  }
}
