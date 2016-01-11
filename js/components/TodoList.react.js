import dateFormat from 'dateformat';
import React, { Component } from 'react';

export default class TodoList extends Component {
  render() {
    const { todos, onComplete } = this.props;
    const formatTime = (date) => dateFormat(date, 'ddd, mmm d')
    const completedTime = (date) => {
      if (date) {
        return formatTime(date);
      } else {
        return "";
      }
    }
    return (
      <ul className='todo_list'>
        {todos.map(todo =>
          <li key={todo.id} onClick={(e) => onComplete(todo)}>
            {todo.text} ({formatTime(todo.addedAt)}) ({completedTime(todo.completedAt)})
          </li>
        )}
      </ul>
    );
  }
};
