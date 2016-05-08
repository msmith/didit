import React, { Component } from 'react';

// Components
import TodoList from './TodoList.react';

// Material-UI components
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

export default class TodoGroups extends Component {
  render() {
    const { todos, groupBy, title, reverseOrder, ...other } = this.props;
    const uniqueDates = new Set(todos.map((t) => groupBy(t)));
    const dateArray = Array.from(uniqueDates).sort();
    const sortedDates = reverseOrder ? dateArray.reverse() : dateArray;
    return (
      <Paper>
        {sortedDates.map(groupKey =>
          <div key={groupKey}>
            <TodoList
              {...other}
              title={title(groupKey)}
              todos={todos.filter((t) => (groupBy(t) === groupKey))}
            />
            <Divider />
          </div>
        )}
      </Paper>
    );
  }
}
