import dateFormat from 'dateformat';
import React, { Component } from 'react';
import TodoList from './TodoList.react';
var lodash = require('lodash');
var moment = require('moment');

export default class TodoGroups extends Component {
  render() {
    const { groupTitle, todos, onToggle } = this.props;
    const format = 'ddd, mmm d';
    const formatTime = (date) => date ? dateFormat(date, format) : undefined;
    const toAddedAt = (todo) => moment(todo.addedAt).startOf('day').toDate();
    const groupedTodos = lodash.groupBy(todos, toAddedAt);
    return (
      <div>
      {lodash.keys(groupedTodos).map(date =>
        <div key={date}>
          <h3>{formatTime(date)}</h3>
          <TodoList todos={groupedTodos[date]} onToggle={onToggle} />
        </div>
      )}
      </div>
    );
  }
}
