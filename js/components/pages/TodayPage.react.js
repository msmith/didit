import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoGroups from '../TodoGroups.react';
import AppBar from 'material-ui/lib/app-bar';
import ActionDoneAll from 'material-ui/lib/svg-icons/action/done-all';
const lodash = require('lodash');

class TodayPage extends Component {
  render() {
    const dispatch = this.props.dispatch;
    const { todos, debug } = this.props.data;
    const onDestroy = null;
    const sweepButton = null;
    const onTodoToggle = null;
    const onDateChange = null;
    const activeTodos = lodash.reject(todos, (t) => t.completedAt);
    const completedTodos = lodash.filter(todos, (t) => t.completedAt);
    return (
      <div>
        <AppBar
          title='Did it'
          iconElementRight={sweepButton}
        />
        <div className='page-content'>
          <h1>Completed</h1>
          <TodoGroups
            todos={completedTodos}
            onDestroy={onDestroy}
            onToggle={onTodoToggle}
            onDateChange={onDateChange}
          />

          <h1>To Do</h1>
          <TodoGroups
            todos={activeTodos}
            onDestroy={onDestroy}
            onToggle={onTodoToggle}
            onDateChange={onDateChange}
          />
        </div>
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
export default connect(select)(TodayPage);
