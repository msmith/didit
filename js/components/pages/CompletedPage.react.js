import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoGroups from '../TodoGroups.react';
import MainAppBar from '../MainAppBar.react';
import ActionDoneAll from 'material-ui/lib/svg-icons/action/done-all';
const lodash = require('lodash');
const moment = require('moment');

class CompletedPage extends Component {
  render() {
    const dispatch = this.props.dispatch;
    const { todos } = this.props.data;
    const groupByCompletedAt = (todo) => {
      if (todo.completedAt) {
        return moment(todo.completedAt).startOf('day').toISOString();
      } else {
        return undefined;
      }
    };
    const secondaryText = (todo) => {
      return 'Added ' + moment(todo.addedAt).fromNow();
    }

    return (
      <div>
        <MainAppBar />
        <div className='page-content'>
          <TodoGroups
          todos={todos}
          secondaryText={secondaryText}
          groupBy={groupByCompletedAt}
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
export default connect(select)(CompletedPage);
