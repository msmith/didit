import React, { Component } from 'react';

// Components
import TodoItem from './TodoItem.react';

// Material-UI components
import Divider from 'material-ui/Divider';
import List from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';

export default class TodoList extends Component {
  render() {
    const { todos, groupBy, sortComparator, ...other } = this.props;
    const sortedTodos = todos.sort(sortComparator);
    const groupKeys = sortedTodos.map(t => groupBy(t));
    const uniqueGroupKeys = groupKeys.filter((item, pos, arr) => {
      return pos === 0 || item !== arr[pos - 1];
    });
    const todosInGroup = (groupKey) => todos.filter(t => groupBy(t) === groupKey);

    return (
      <Paper>
        {uniqueGroupKeys.map(groupKey => (
          <div key={groupKey}>
            <List>
              <Subheader>{groupKey}</Subheader>
              {todosInGroup(groupKey).map(todo => (
                <TodoItem
                  {...other}
                  key={todo.id}
                  todo={todo}
              />))}
            </List>
            <Divider />
          </div>
          )
        )}
      </Paper>
    );
  }
}
