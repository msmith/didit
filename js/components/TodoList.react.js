import React, { Component } from 'react';

export default class TodoList extends Component {
  render() {
    const { todos } = this.props;
    return (
      <ul>
        {todos.map(todo =>
          <li key={todo.id}>
            {todo.text} ({todo.addedAt.toString()})
          </li>
        )}
      </ul>
    );
  }
};
