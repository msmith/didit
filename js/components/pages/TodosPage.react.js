import { addTodoItem, completeTodoItem, uncompleteTodoItem, moveTodoItem, removeTodoItem, archiveTodoItems, toggleDebug } from '../../actions/AppActions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoGroups from '../TodoGroups.react';
import AddTodo from '../AddTodo.react';
import StateDump from '../StateDump.react';
import MainAppBar from '../MainAppBar.react';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import ActionDoneAll from 'material-ui/lib/svg-icons/action/done-all';
const moment = require('moment');

class TodosPage extends Component {
  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      switch(e.code) {
        case 'Backquote':
          this.props.dispatch(toggleDebug())
          break;
      }
    });
  }

  render() {
    const dispatch = this.props.dispatch;
    const { todos, debug } = this.props.data;
    const onArchive = () => dispatch(archiveTodoItems());
    const onDestroy = (todo) => dispatch(removeTodoItem(todo.id));
    const onAdd = (text) => {
      const today = new Date();
      const id = new Date().getTime();
      dispatch(addTodoItem(id, text, today));
    };
    const onDateChange = (todo, change) => {
      const newDate = moment(todo.addedAt).add(change, 'days');
      dispatch(moveTodoItem(todo.id, newDate));
    }
    const onTodoToggle = (todo) => {
      const toggle = todo.completedAt ? uncompleteTodoItem : completeTodoItem;
      dispatch(toggle(todo.id));
    };
    const sweepButton = (
      <IconButton onClick={onArchive}>
        <ActionDoneAll />
      </IconButton>
    );
    const groupByAddedAt = (todo) => moment(todo.addedAt).startOf('day').toISOString();

    const formatDate = (date) => moment(date).format('ddd, MMM D');
    const secondaryText = (todo) => {
      if (todo.completedAt) {
        return 'Completed ' + formatDate(todo.completedAt);
      }
    }

    return (
      <div>
        <MainAppBar
          iconElementRight={sweepButton}
        />
        <div className='page-content'>
          <TodoGroups
            todos={todos}
            secondaryText={secondaryText}
            onDestroy={onDestroy}
            onToggle={onTodoToggle}
            onDateChange={onDateChange}
            groupBy={groupByAddedAt}
          />
          <AddTodo onAdd={onAdd} />
          {debug ? <StateDump data={this.props.data} /> : '' }
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
export default connect(select)(TodosPage);
