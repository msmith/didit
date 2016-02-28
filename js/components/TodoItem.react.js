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
        <IconButton onClick={() => onDateChange(todo, -1)} tooltip='-1 day'>
          <NavigationArrowUpward />
        </IconButton>
        <IconButton onClick={() => onDateChange(todo, 1)} tooltip='+1 day'>
          <NavigationArrowDownward />
        </IconButton>
        <IconButton onClick={() => onDestroy(todo)} tooltip='Delete'>
          <ActionDelete />
        </IconButton>
        </div>
      </div>
    );
  }
}
