import React, { Component } from 'react';
import Paper from 'material-ui/lib/paper';
import TodoList from './TodoList.react';

export default class TodoGroup extends Component {
  render() {
    const { title, todos, onToggle, onDestroy, onDateChange } = this.props;
    const paperStyle = { rounded: false };
    const buttonStyle = { float: 'right' };
    return (
      <div className='todo-group'>
        <div className='section-header'>
          {title}
        </div>
        <Paper style={paperStyle} zDepth={1}>
          <TodoList
            todos={todos}
            onToggle={onToggle}
            onDestroy={onDestroy}
            onDateChange={onDateChange}
          />
        </Paper>
      </div>
    );
  }
}
