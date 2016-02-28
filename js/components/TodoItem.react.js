import React, { Component } from 'react';
import Checkbox from 'material-ui/lib/checkbox';
import IconButton from 'material-ui/lib/icon-button';
import NavigationArrowUpward from 'material-ui/lib/svg-icons/navigation/arrow-upward';
import NavigationArrowDownward from 'material-ui/lib/svg-icons/navigation/arrow-downward';
import ActionDelete from 'material-ui/lib/svg-icons/action/delete';

export default class TodoItem extends Component {
  render() {
    const { todo, onToggle, onDestroy, onDateChange } = this.props;
    return (
      <div className='todo-item'>
        <Checkbox
          defaultChecked={!!todo.completedAt}
          label={todo.text}
          onCheck={() => onToggle(todo)}
        />
        <div className='actions'>
        <IconButton onClick={() => onDateChange(todo, -1)}>
          <NavigationArrowUpward />
        </IconButton>
        <IconButton onClick={() => onDateChange(todo, 1)}>
          <NavigationArrowDownward />
        </IconButton>
        <IconButton onClick={() => onDestroy(todo)}>
          <ActionDelete />
        </IconButton>
        </div>
      </div>
    );
  }
}
