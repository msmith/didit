import React, { Component } from 'react';

// Material-UI components
import { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

export default class TodoItem extends Component {
  render() {
    const { todo, secondaryText, onToggle, itemRightIconButton } = this.props;
    const checkbox = (
      <Checkbox
        defaultChecked={!!todo.completedAt}
        disabled={!!todo.archivedAt}
        onCheck={() => onToggle && onToggle(todo)}
      />
    );

    return (
      <ListItem
        key={todo.id}
        primaryText={todo.text}
        secondaryText={secondaryText(todo)}
        leftCheckbox={checkbox}
        disabled
        rightIconButton={itemRightIconButton && itemRightIconButton(todo)}
      />
    );
  }
}
