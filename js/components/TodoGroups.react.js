import React, { Component } from 'react';
import TodoGroup from './TodoGroup.react';
var lodash = require('lodash');
var moment = require('moment');

export default class TodoGroups extends Component {
  render() {
    const { groupTitle, todos, onToggle, onDestroy } = this.props;
    const formatTitle = (date) => moment(date).format('ddd, MMM D');
    const groupBy = (todo) => moment(todo.addedAt).startOf('day').toISOString();
    const groupedTodos = lodash.groupBy(todos, groupBy);
    const sortedDates = lodash.sortBy(lodash.keys(groupedTodos));
    const numComplete = _.filter(todos, 'completedAt').length;
    const numTotal = this.props.todos.length;
    return (
      <div className='todo-groups'>
      {sortedDates.map(date =>
        <TodoGroup
          title={formatTitle(date)}
          todos={groupedTodos[date]}
          onToggle={onToggle}
          onDestroy={onDestroy}
          key={date}
        />
      )}
      </div>
    );
  }
}