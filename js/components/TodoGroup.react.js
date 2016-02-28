import React, { Component } from 'react';
import TodoList from './TodoList.react';
var lodash = require('lodash');

export default class TodoGroup extends Component {
  render() {
    const { title, todos, onToggle, onDestroy } = this.props;
    const numComplete = lodash.filter(todos, 'completedAt').length;
    const numTotal = todos.length;
    var groupClass = 'todo-group';
    if (numComplete === numTotal) {
      groupClass += ' complete';
    }
    return (
      <div className={groupClass}>
        <h4>
          {title}
          <span className='todo-count badge'>{numComplete} / {numTotal}</span>
        </h4>
        <TodoList todos={todos} onToggle={onToggle} onDestroy={onDestroy}/>
      </div>
    );
  }
}
