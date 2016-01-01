/*
 * HomePage
 * This is the first thing users see of our App
 */

import { asyncAddTodoItem } from '../../actions/AppActions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
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
        <AddTodo onAdd={(text) => {
          dispatch(asyncAddTodoItem(nextTodoId++, text))
        }} ></AddTodo>
        <TodoList todos={todos}></TodoList>
        <Link className="btn" to="/readme">Setup</Link>
      </div>
    );
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
