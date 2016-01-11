/*
 * HomePage
 * This is the first thing users see of our App
 */

import { asyncAddTodoItem, asyncCompleteTodoItem, asyncUncompleteTodoItem } from '../../actions/AppActions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoList from '../TodoList.react';
import AddTodo from '../AddTodo.react';

let nextTodoId = 3;

class HomePage extends Component {
  render() {
    const dispatch = this.props.dispatch;
    const { todos } = this.props.data;
    return (
      <div>
        <h1>To Do</h1>
        <AddTodo onAdd={(text) =>
          dispatch(asyncAddTodoItem(nextTodoId++, text))
        } />
        <TodoList todos={todos} onToggle={(todo) => {
          if (todo.completedAt) {
            dispatch(asyncUncompleteTodoItem(todo.id));
          } else {
            dispatch(asyncCompleteTodoItem(todo.id));
          }
        }} />
      </div>);
  }
}

// REDUX STUFF

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(HomePage);
