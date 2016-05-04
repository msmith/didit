import React, { Component } from 'react';
import TodoList from './TodoList.react';
import Divider from 'material-ui/lib/divider';
const lodash = require('lodash');
const moment = require('moment');

export default class TodoGroups extends Component {
  render() {
    const { todos, groupBy, ...other } = this.props;
    const formatTitle = (date) => {
      if (date === "undefined") {
        return 'Incomplete';
      } else {
        return moment(date).format('ddd, MMM D');
      }
    };
    const visibleTodos = lodash.reject(todos, (t) => t.archivedAt);
    const groupedTodos = lodash.groupBy(visibleTodos, groupBy);
    const sortedDates = lodash.sortBy(lodash.keys(groupedTodos));
    return (
      <div className='todo-groups'>
      {sortedDates.map(date =>
        <div key={date}>
          <TodoList
            {...other}
            title={formatTitle(date)}
            todos={groupedTodos[date]}
          />
          <Divider />
        </div>
      )}
      </div>
    );
  }
}
