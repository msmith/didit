import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import MainAppBar from '../MainAppBar.react';
import TodoGroups from '../TodoGroups.react';

// Helpers
import { formatDate, archivedTodos, completedAtDate } from '../../utils/todos';

class ArchivePage extends Component {
  render() {
    const { todos } = this.props.data;
    const formatTitle = (groupKey) => {
      if (groupKey === 'undefined') {
        return 'Incomplete';
      }

      return formatDate(groupKey);
    };
    const secondaryText = (todo) => {
      if (todo.completedAt) {
        return 'Completed ' + formatDate(todo.completedAt);
      }
    };

    return (
      <div>
        <MainAppBar title="Archived"/>
        <div className="page-content">
          <TodoGroups
          todos={archivedTodos(todos)}
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
