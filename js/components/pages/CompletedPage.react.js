import React, { Component } from 'react';
import { connect } from 'react-redux';

import { completeTodoItem, uncompleteTodoItem } from '../../actions/AppActions';

// Components
import MainAppBar from '../MainAppBar.react';
import TodoGroups from '../TodoGroups.react';

// Helpers
import { formatDate, completedTodos, completedAtDate } from '../../utils/todos';

class CompletedPage extends Component {
  render() {
    const dispatch = this.props.dispatch;
    const { todos } = this.props.data;
    const secondaryText = (todo) => {
      return 'Added ' + formatDate(todo.addedAt);
    };

    const onTodoToggle = (todo) => {
      const fn = todo.completedAt ? uncompleteTodoItem : completeTodoItem;
      dispatch(fn(todo.id));
    };

    return (
      <div>
        <MainAppBar title="Completed" />
        <div className="page-content">
          <TodoGroups
          todos={completedTodos(todos)}
          secondaryText={secondaryText}
          groupBy={completedAtDate}
          title={formatDate}
          onToggle={onTodoToggle}
          reverseOrder
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
