import React, { Component } from 'react';
import TodoList from './TodoList.react';
var lodash = require('lodash');

export default class TodoGroup extends Component {
  render() {
    const { title, todos, onToggle } = this.props;
    const numComplete = lodash.filter(todos, 'completedAt').length;
    const numTotal = this.props.todos.length;
    var groupClass = 'todo-group panel panel-default';
    if (numComplete === numTotal) {
      groupClass += ' complete';
    }
    return (
      <div key={title} className={groupClass}>
        <h4>
          {title}
          <span className='todo-count badge'>{numComplete} / {numTotal}</span>
        </h4>
        <TodoList todos={todos} onToggle={onToggle} />
      </div>
    );
  }
}
