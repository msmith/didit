import React, { Component } from 'react';
import TodoItem from './TodoItem.react';

export default class TodoList extends Component {
  render() {
    const { todos, onToggle, onDestroy } = this.props;
    return (
      <ul className='todo-list'>
        {todos.map(todo =>
          <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDestroy={onDestroy} />
        )}
      </ul>
    );
  }
}
