import React, { Component } from 'react';
import Link from './Link.react';
import Checkbox from 'material-ui/lib/checkbox';
import ActionDelete from 'material-ui/lib/svg-icons/action/delete';

export default class TodoItem extends Component {
  render() {
    const { todo, onToggle, onDestroy } = this.props;
    return (
      <li className='checkbox todo-item'>
        <Checkbox
          defaultChecked={!!todo.completedAt}
          label={todo.text}
          onCheck={() => onToggle(todo)}
        />
        <div className='actions'>
          <Link action={() => onDestroy(todo)}>
            <ActionDelete />
          </Link>
        </div>
      </li>
    );
  }
}
