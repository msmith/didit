import React, { Component } from 'react';

// Components
import TodoList from './TodoList.react';

// Material-UI components
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

export default class TodoGroups extends Component {
  render() {
    const { todos, groupBy, title, ...other } = this.props;
    const uniqueDates = new Set(todos.map((t) => groupBy(t)));
    const sortedDates = Array.from(uniqueDates).sort();
    return (
      <Paper>
        {sortedDates.map(groupKey =>
          <div key={groupKey}>
            <TodoList
              {...other}
              title={title(groupKey)}
              todos={todos.filter((t) => (groupBy(t) == groupKey))}
            />
            <Divider />
          </div>
        )}
      </Paper>
    );
  }
}
