import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoGroups from '../TodoGroups.react';
import MainAppBar from '../MainAppBar.react';
import ActionDoneAll from 'material-ui/svg-icons/action/done-all';
import Folder from 'material-ui/svg-icons/file/folder';

const dateFormat = require('dateformat');
const lodash = require('lodash');

class CompletedPage extends Component {
  render() {
    const dispatch = this.props.dispatch;
    const { todos } = this.props.data;
    const formatDate = (date) => dateFormat(date, 'ddd, mmm d');
    const completedAtDate = (todo) => {
      if (todo.completedAt) {
        var d = new Date(todo.completedAt);
        return [d.getFullYear(), d.getMonth(), d.getDate()];
      }
    };
    const formatTitle = (groupKey) => {
      if (groupKey === "undefined") {
        return 'Incomplete';
      } else {
        return formatDate(groupKey);
      }
    };
    const secondaryText = (todo) => {
      return 'Added ' + formatDate(todo.addedAt);
    }
    const visibleTodos = lodash.reject(todos, (t) => t.archivedAt);

    return (
      <div>
        <MainAppBar title='Completed'/>
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
export default connect(select)(CompletedPage);
