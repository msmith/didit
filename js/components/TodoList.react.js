import React, { Component } from 'react';
import FaIcon from './FaIcon.react';
import Link from './Link.react';

export default class TodoList extends Component {
  render() {
    const { todos, onToggle, onDestroy } = this.props;
    return (
      <ul className='todo_list'>
        {todos.map(todo =>
          <li key={todo.id} className='checkbox'>
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
                <FaIcon icon='fw trash'/>
              </Link>
            </div>
          </li>
        )}
      </ul>
    );
  }
}
