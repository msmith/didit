import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoGroups from '../TodoGroups.react';
import MainAppBar from '../MainAppBar.react';
import ActionDoneAll from 'material-ui/lib/svg-icons/action/done-all';
import Folder from 'material-ui/lib/svg-icons/file/folder';

const lodash = require('lodash');
const moment = require('moment');

class ArchivePage extends Component {
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
    const formatTitle = (groupKey) => {
      if (groupKey === "undefined") {
        return 'Incomplete';
      } else {
        return moment(groupKey).format('ddd, MMM D');
      }
    };
    const formatDate = (date) => moment(date).format('ddd, MMM D');
    const secondaryText = (todo) => {
      if (todo.completedAt) {
        return 'Completed ' + formatDate(todo.completedAt);
      }
    }

    const visibleTodos = lodash.filter(todos, (t) => t.archivedAt);

    return (
      <div>
        <MainAppBar title='Archived'/>
        <div className='page-content'>
          <TodoGroups
          todos={visibleTodos}
          secondaryText={secondaryText}
          groupBy={groupByCompletedAt}
          title={formatTitle}
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
export default connect(select)(ArchivePage);
