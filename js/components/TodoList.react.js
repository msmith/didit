import dateFormat from 'dateformat';
import React, { Component } from 'react';

export default class TodoList extends Component {
  render() {
    const { todos, onToggle } = this.props;
    const formatTime = (date) => dateFormat(date, 'ddd, mmm d')
    const completedTime = (date) => {
      if (date) {
        return (<button className='date'>{formatTime(date)}</button>);
      } else {
        return (<button className='incomplete'>-</button>);
      }
    }
    return (
      <ul className='todo_list'>
        {todos.map(todo =>
          <li key={todo.id} onClick={(e) => onToggle(todo)}>
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
