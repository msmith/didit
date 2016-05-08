import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import MainAppBar from '../MainAppBar.react';
import TodoGroups from '../TodoGroups.react';

// Helpers
import { formatDate, unarchivedTodos, completedAtDate } from '../../utils/todos';

class CompletedPage extends Component {
  render() {
    const { todos } = this.props.data;
    const secondaryText = (todo) => {
      return 'Added ' + formatDate(todo.addedAt);
    };

    return (
      <div>
        <MainAppBar title="Completed" />
        <div className="page-content">
          <TodoGroups
          todos={unarchivedTodos(todos)}
          secondaryText={secondaryText}
          groupBy={completedAtDate}
          title={(date) => formatDate(date, 'Incomplete')}
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
