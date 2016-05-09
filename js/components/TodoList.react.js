import React, { Component } from 'react';

// Components
import TodoItem from './TodoItem.react';

// Material-UI components
import List from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

export default class TodoList extends Component {
  render() {
    const { title, todos, secondaryText, onToggle, itemRightIconButton } = this.props;
    return (
      <List>
        <Subheader>{title}</Subheader>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            secondaryText={secondaryText}
            onToggle={onToggle}
            itemRightIconButton={itemRightIconButton}
          />)
        )}
      </List>
    );
  }
}
