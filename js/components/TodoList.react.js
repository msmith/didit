import dateFormat from 'dateformat';
import React, { Component } from 'react';

export default class TodoList extends Component {
  render() {
    const { todos, onToggle } = this.props;
    const formatTime = (date) => {
      if (date) {
        return dateFormat(date, 'ddd, mmm d');
      }
    };
    return (
      <ul className='todo_list'>
        {todos.map(todo =>
          <li key={todo.id}>
            <span className='date'>
              {formatTime(todo.addedAt)}
            </span>
            <button
              className={todo.completedAt ? 'date' : 'incomplete'}
              onClick={(e) => onToggle(todo)}>
              {formatTime(todo.completedAt) || '-'}
            </button>
            {todo.text}
          </li>
        )}
      </ul>
    );
  }
};
