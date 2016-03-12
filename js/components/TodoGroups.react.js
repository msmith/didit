import React, { Component } from 'react';
import TodoGroup from './TodoGroup.react';
const lodash = require('lodash');
const moment = require('moment');

export default class TodoGroups extends Component {
  render() {
    const { todos, onToggle, onDestroy, onDateChange } = this.props;
    const formatTitle = (date) => moment(date).format('ddd, MMM D');
    const groupBy = (todo) => moment(todo.addedAt).startOf('day').toISOString();
    const groupedTodos = lodash.groupBy(todos, groupBy);
    const sortedDates = lodash.sortBy(lodash.keys(groupedTodos));
    return (
      <div className='todo-groups'>
      {sortedDates.map(date =>
        <TodoGroup
          title={formatTitle(date)}
          todos={groupedTodos[date]}
          onToggle={onToggle}
          onDestroy={onDestroy}
          onDateChange={onDateChange}
          key={date}
        />
      )}
      </div>
    );
  }
}
