import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoGroups from '../TodoGroups.react';
import AppBar from 'material-ui/lib/app-bar';
import ActionDoneAll from 'material-ui/lib/svg-icons/action/done-all';
const lodash = require('lodash');
const moment = require('moment');

class TodayPage extends Component {
  render() {
    const dispatch = this.props.dispatch;
    const { todos } = this.props.data;
    const activeTodos = lodash.reject(todos, (t) => t.completedAt);
    const yesterday = moment().subtract(1, 'days').startOf('day');
    const completedTodos = lodash.filter(todos,
      (t) => t.completedAt && moment(t.completedAt) > yesterday
    );
    return (
      <div>
        <AppBar
          title='Did it'
        />
        <div className='page-content'>
          <h2>Completed</h2>
          <TodoGroups todos={completedTodos} />

          <h2>To Do</h2>
          <TodoGroups todos={activeTodos} />
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
