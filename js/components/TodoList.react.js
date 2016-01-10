import React, { Component } from 'react';

export default class TodoList extends Component {
  render() {
    const { todos, onComplete } = this.props;
    return (
      <ul className='todo_list'>
        {todos.map(todo =>
          <li key={todo.id} onClick={(e) => onComplete(todo)}>
            {todo.text} ({todo.addedAt.toString()}) ({todo.completed.toString()})
          </li>
        )}
      </ul>
    );
  }
};
