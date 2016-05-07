import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoGroups from '../TodoGroups.react';
import MainAppBar from '../MainAppBar.react';
import ActionDoneAll from 'material-ui/svg-icons/action/done-all';
import Folder from 'material-ui/svg-icons/file/folder';

import { formatDate, toDate } from '../../utils/dates'

const lodash = require('lodash');

class ArchivePage extends Component {
  render() {
    const dispatch = this.props.dispatch;
    const { todos } = this.props.data;
    const completedAtDate = (todo) => toDate(todo.completedAt);
    const formatTitle = (groupKey) => {
      if (groupKey === "undefined") {
        return 'Incomplete';
      } else {
        return formatDate(groupKey);
      }
    };
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
          groupBy={completedAtDate}
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
