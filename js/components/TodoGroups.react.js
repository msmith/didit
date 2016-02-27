import React, { Component } from 'react';
import TodoList from './TodoList.react';
var lodash = require('lodash');
var moment = require('moment');

export default class TodoGroups extends Component {
  render() {
    const { groupTitle, todos, onToggle } = this.props;
    const formatTitle = (date) => moment(date).format('ddd, MMM D');
    const groupBy = (todo) => moment(todo.addedAt).startOf('day').toISOString();
    const groupedTodos = lodash.groupBy(todos, groupBy);
    const sortedDates = lodash.sortBy(lodash.keys(groupedTodos));
    return (
      <div>
      {sortedDates.map(date =>
        <div key={date}>
          <h3>{formatTitle(date)}</h3>
          <TodoList todos={groupedTodos[date]} onToggle={onToggle} />
        </div>
      )}
      </div>
    );
  }
}
