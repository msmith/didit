import React, { Component } from 'react';
import Checkbox from 'material-ui/lib/checkbox';
import IconButton from 'material-ui/lib/icon-button';
import ActionDelete from 'material-ui/lib/svg-icons/action/delete';
import ActionDateRange from 'material-ui/lib/svg-icons/action/date-range';

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
          <IconButton onClick={() => onDestroy(todo)}>
            <ActionDelete />
          </IconButton>
          <IconButton onClick={() => onDateChange(todo)}>
            <ActionDateRange />
          </IconButton>
        </div>
      </div>
    );
  }
}
