import React, { Component } from 'react';
import TodoItem from './TodoItem.react';
import Divider from 'material-ui/lib/divider';

export default class TodoList extends Component {
  render() {
    const { todos, onToggle, onDestroy } = this.props;
    return (
      <div>
        {todos.map(todo =>
          <div key={todo.id} >
            <TodoItem todo={todo} onToggle={onToggle} onDestroy={onDestroy} />
            <Divider />
          </div>
        )}
      </div>
    );
  }
}
