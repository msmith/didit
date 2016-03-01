import { addTodoItem, completeTodoItem, uncompleteTodoItem, moveTodoItem, removeTodoItem, archiveTodoItems, toggleDebug } from '../../actions/AppActions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TodoGroups from '../TodoGroups.react';
import AddTodo from '../AddTodo.react';
import StateDump from '../StateDump.react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import ActionDoneAll from 'material-ui/lib/svg-icons/action/done-all';
var moment = require('moment');

class TodosPage extends Component {
  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      switch(e.code) {
        case 'KeyD':
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
    return (
      <div>
        <AppBar
          title='Did it 2'
          iconElementRight={sweepButton}
        />
        <div className='page-content'>
          <TodoGroups
            todos={todos}
            onDestroy={onDestroy}
            onToggle={onTodoToggle}
            onDateChange={onDateChange}
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
