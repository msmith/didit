/*
 * HomePage
 * This is the first thing users see of our App
 */

import { addTodoItem, completeTodoItem, uncompleteTodoItem, removeTodoItem } from '../../actions/AppActions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoGroups from '../TodoGroups.react';
import AddTodo from '../AddTodo.react';

class HomePage extends Component {
  render() {
    const dispatch = this.props.dispatch;
    const { todos } = this.props.data;
    const onDestroy = (todo) => dispatch(removeTodoItem(todo.id));
    const onAdd = (text) => {
      const id = new Date().getTime();
      dispatch(addTodoItem(id, text));
    };
    const onToggle = (todo) => {
      if (todo.completedAt) {
        dispatch(uncompleteTodoItem(todo.id));
      } else {
        dispatch(completeTodoItem(todo.id));
      }
    };
    return (
      <div>
        <TodoGroups todos={todos} onDestroy={onDestroy} onToggle={onToggle} />
        <AddTodo onAdd={onAdd} />
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
