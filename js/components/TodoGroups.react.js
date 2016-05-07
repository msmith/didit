import React, { Component } from 'react';

// Components
import TodoList from './TodoList.react';

// Material-UI components
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

const lodash = require('lodash');

export default class TodoGroups extends Component {
  render() {
    const { todos, groupBy, title, ...other } = this.props;
    const groupedTodos = lodash.groupBy(todos, groupBy);
    const sortedDates = lodash.sortBy(lodash.keys(groupedTodos));
    return (
      <Paper>
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
      </Paper>
    );
  }
}
