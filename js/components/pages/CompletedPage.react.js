import React, { Component } from 'react';
import { connect } from 'react-redux';

import { completeTodoItem, uncompleteTodoItem } from '../../actions/AppActions';

// Components
import MainAppBar from '../MainAppBar.react';
import TodoList from '../TodoList.react';

// Helpers
import { formatDate, completedTodos, groupForDate } from '../../utils/todos';

const secondaryText = (todo) => 'Added ' + formatDate(todo.addedAt);
const sortbyCompletedAtReverse = (a, b) => new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime();

class CompletedPage extends Component {
  render() {
    const dispatch = this.props.dispatch;
    const { todos } = this.props.data;

    const onTodoToggle = (todo) => {
      const fn = todo.completedAt ? uncompleteTodoItem : completeTodoItem;
      dispatch(fn(todo.id));
    };

    return (
      <div>
        <MainAppBar title="Completed" />
        <div className="page-content">
          <TodoList
          todos={todos}
          secondaryText={secondaryText}
          groupBy={t => groupForDate(t.completedAt)}
          sortComparator={sortbyCompletedAtReverse}
          onToggle={onTodoToggle}
          />
        </div>
      </div>);
  }
}

// REDUX STUFF

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: {
      todos: completedTodos(state.todos)
    }
  };
}


// Wrap the component to inject dispatch and state into it
export default connect(select)(CompletedPage);
