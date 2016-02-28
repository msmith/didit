/*
 * HomePage
 * This is the first thing users see of our App
 */

import { asyncAddTodoItem, asyncCompleteTodoItem, asyncUncompleteTodoItem, asyncRemoveTodoItem } from '../../actions/AppActions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoGroups from '../TodoGroups.react';
import AddTodo from '../AddTodo.react';

let nextTodoId = 3;

class HomePage extends Component {
  render() {
    const dispatch = this.props.dispatch;
    const { todos } = this.props.data;
    const onDestroy = (todo) => dispatch(asyncRemoveTodoItem(todo.id));
    return (
      <div>
        <TodoGroups todos={todos} onDestroy={onDestroy} onToggle={(todo) => {
          const today = new Date(2016, 2, 7 * Math.random());
          if (todo.completedAt) {
            dispatch(asyncUncompleteTodoItem(todo.id));
          } else {
            dispatch(asyncCompleteTodoItem(todo.id, today));
          }
        }} />
        <AddTodo onAdd={(text) => {
          const today = new Date(2016, 2, 7 * Math.random());
          dispatch(asyncAddTodoItem(nextTodoId++, text, today));
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
