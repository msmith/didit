import React, { Component } from 'react';

// Material-UI components
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Subheader from 'material-ui/Subheader';

export default class TodoList extends Component {
  render() {
    const { title, todos, secondaryText, onToggle, itemRightIcon, itemRightIconButton } = this.props;
    return (
      <div>
        <List>
          <Subheader>{title}</Subheader>
          {todos.map(todo => {
            let checkbox;
            if (onToggle) {
              checkbox = (<Checkbox
                defaultChecked={!!todo.completedAt}
                onCheck={() => onToggle(todo)}
              />);
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
