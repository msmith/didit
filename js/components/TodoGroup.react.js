import React, { Component } from 'react';
import TodoList from './TodoList.react';
var lodash = require('lodash');
var moment = require('moment');

export default class TodoGroup extends Component {
  render() {
    const { title, todos, onToggle } = this.props;
    const numComplete = lodash.filter(todos, 'completedAt').length;
    const numTotal = this.props.todos.length;
    return (
      <div key={title} className='todo-group'>
        <h4>
          {title}
          <span className='todo-count badge'>{numComplete} / {numTotal}</span>
        </h4>
        <TodoList todos={todos} onToggle={onToggle} />
      </div>
    );
  }
}
