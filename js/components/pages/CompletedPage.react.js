import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoGroups from '../TodoGroups.react';
import MainAppBar from '../MainAppBar.react';
import ActionDoneAll from 'material-ui/lib/svg-icons/action/done-all';
import Folder from 'material-ui/lib/svg-icons/file/folder';


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
    const formatTitle = (groupKey) => {
      if (groupKey === "undefined") {
        return 'Incomplete';
      } else {
        return moment(groupKey).format('ddd, MMM D');
      }
    };
    const secondaryText = (todo) => {
      return 'Added ' + moment(todo.addedAt).fromNow();
    }

    const rightIcon = (todo) => todo.archivedAt ? <Folder /> : null;

    return (
      <div>
        <MainAppBar title='Completed'/>
        <div className='page-content'>
          <TodoGroups
          todos={todos}
          secondaryText={secondaryText}
          groupBy={groupByCompletedAt}
          title={formatTitle}
          itemRightIcon={rightIcon}
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
