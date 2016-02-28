import React, { Component } from 'react';
import FaIcon from './FaIcon.react';
import Link from './Link.react';

export default class TodoItem extends Component {
  render() {
    const { todo, onToggle, onDestroy } = this.props;
    return (
      <li className='checkbox'>
        <label>
          <input
            type='checkbox'
            defaultChecked={todo.completedAt}
            onClick={() => onToggle(todo)}
          />
          {todo.text}
        </label>
        <div className='actions'>
          <Link action={() => onDestroy(todo)}>
            <FaIcon icon='trash'/>
          </Link>
        </div>
      </li>
    );
  }
}
