import React, { Component } from 'react';
import TodoItem from './TodoItem.react';
import Checkbox from 'material-ui/lib/checkbox';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

export default class TodoList extends Component {
  render() {
    const { todos, onToggle, onDestroy, onDateChange, title } = this.props;
    return (
      <List subheader={title}>
        {todos.map(todo => {
          if (onToggle) {
            var checkbox = (<Checkbox
              defaultChecked={!!todo.completedAt}
              onCheck={() => onToggle(todo)}
            />);
            return (
              <ListItem
                primaryText={todo.text}
                leftCheckbox={checkbox}
              />
            )
          } else {
            return (<ListItem primaryText={todo.text} />);
          }
        })}
      </List>
    );
  }
}
