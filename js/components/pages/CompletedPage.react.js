import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import MainAppBar from '../MainAppBar.react';
import TodoGroups from '../TodoGroups.react';

// Material-UI icons
import ActionDoneAll from 'material-ui/svg-icons/action/done-all';

// Helpers
import { formatDate , toDate } from '../../utils/dates'
import { unarchivedTodos, completedAtDate } from '../../utils/todos'

class CompletedPage extends Component {
  render() {
    const dispatch = this.props.dispatch;
    const { todos } = this.props.data;
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

    return (
      <div>
        <MainAppBar title='Completed'/>
        <div className='page-content'>
          <TodoGroups
          todos={unarchivedTodos(todos)}
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
