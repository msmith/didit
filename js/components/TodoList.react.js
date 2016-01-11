import dateFormat from 'dateformat';
import React, { Component } from 'react';

export default class TodoList extends Component {
  render() {
    const { todos, onComplete } = this.props;
    const formatTime = (date) => dateFormat(date, 'ddd, mmm d')
    const completedTime = (date) => {
      if (date) {
        return (<span className='date'>{formatTime(date)}</span>);
      } else {
        return (<button className='incomplete'>-</button>);
      }
    }
    return (
      <ul className='todo_list'>
        {todos.map(todo =>
          <li key={todo.id} onClick={(e) => onComplete(todo)}>
            <span className='date'>
              {formatTime(todo.addedAt)}
            </span>
            {completedTime(todo.completedAt)}
            {todo.text}
          </li>
        )}
      </ul>
    );
  }
};
