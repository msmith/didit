import React, { Component } from 'react';
import TodoList from './TodoList.react';
import Divider from 'material-ui/lib/divider';

const lodash = require('lodash');

export default class TodoGroups extends Component {
  render() {
    const { todos, groupBy, title, ...other } = this.props;
    const groupedTodos = lodash.groupBy(todos, groupBy);
    const sortedDates = lodash.sortBy(lodash.keys(groupedTodos));
    return (
      <div>
      {sortedDates.map(groupKey =>
        <div key={groupKey}>
          <TodoList
            {...other}
            title={title(groupKey)}
            todos={groupedTodos[groupKey]}
          />
          <Divider />
        </div>
      )}
      </div>
    );
  }
}
