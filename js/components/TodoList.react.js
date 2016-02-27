import dateFormat from 'dateformat';
import React, { Component } from 'react';
var lodash = require('lodash');
var moment = require('moment');

export default class TodoList extends Component {
  render() {
    const { todos, onToggle } = this.props;
    const format = 'ddd, mmm d';
    const formatTime = (date) => date ? dateFormat(date, format) : undefined;
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
