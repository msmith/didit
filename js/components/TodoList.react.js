import React, { Component } from 'react';

export default class TodoList extends Component {
  render() {
    const { todos, onToggle } = this.props;
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
          </li>
        )}
      </ul>
    );
  }
}
