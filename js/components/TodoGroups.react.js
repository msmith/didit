import React, { Component } from 'react';

// Components
import TodoList from './TodoList.react';

// Material-UI components
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

export default class TodoGroups extends Component {
  render() {
    const { todos, groupBy, sortComparator, ...other } = this.props;
    const sortedTodos = todos.sort(sortComparator);
    const groupKeys = sortedTodos.map((t) => groupBy(t));
    const uniqueGroupKeys = groupKeys.filter((item, pos, arr) => {
      return pos === 0 || item !== arr[pos - 1];
    });
    const sortedGroupKeys = uniqueGroupKeys;
    return (
      <Paper>
        {sortedGroupKeys.map(groupKey =>
          <div key={groupKey}>
            <TodoList
              {...other}
              title={groupKey}
              todos={todos.filter((t) => (groupBy(t) === groupKey))}
            />
            <Divider />
          </div>
        )}
      </Paper>
    );
  }
}
