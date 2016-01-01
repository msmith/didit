/*
 * HomePage
 * This is the first thing users see of our App
 */

import { asyncChangeProjectName, asyncChangeOwnerName, asyncAddTodoItem } from '../../actions/AppActions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import TodoList from '../TodoList.react';

let nextTodoId = 3;

class HomePage extends Component {
  render() {
    const dispatch = this.props.dispatch;
    const { projectName, ownerName, todos } = this.props.data;
    return (
      <div>
        <h1>To Do</h1>
        <input ref={node => {
          this.input = node;
        }} />
        <button onClick={() => {
          dispatch(asyncAddTodoItem(nextTodoId++, this.input.value));
        }}>
          Add
        </button>
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
