import React, { Component } from 'react';
var lodash = require('lodash');
var moment = require('moment');

export default class TodoList extends Component {
  render() {
    const { todos, onToggle } = this.props;
    const format = 'ddd, MMM D';
    const formatTime = (date) => date ? moment(date).format(format) : undefined;
    return (
      <ul className="todo_list">
        {todos.map(todo =>
          <li key={todo.id}>
            <span className="date">
              {formatTime(todo.addedAt)}
            </span>
            <button
              className={todo.completedAt ? 'date' : 'incomplete'}
              onClick={() => onToggle(todo)}>
              {formatTime(todo.completedAt) || '-'}
            </button>
            {todo.text}
          </li>
        )}
      </ul>
    );
  }
}
