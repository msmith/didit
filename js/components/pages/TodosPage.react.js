import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addTodoItem, completeTodoItem, uncompleteTodoItem, updateTodoItem, deleteTodoItem, archiveTodoItems, toggleDebug } from '../../actions/AppActions';

// Components
import AddTodo from '../AddTodo.react';
import MainAppBar from '../MainAppBar.react';
import StateDump from '../StateDump.react';
import TodoGroups from '../TodoGroups.react';

// Material-UI components
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

// Material-UI icons
import ActionDelete from 'material-ui/svg-icons/action/delete';
import Archive from 'material-ui/svg-icons/content/archive';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import NavigationArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';

// Helpers
import { addDays, formatDate, simpleFormatDate, unarchivedTodos, groupForDate } from '../../utils/todos';

const secondaryText = (todo) => {
  if (todo.completedAt) {
    return 'Completed ' + formatDate(todo.completedAt);
  }
};

class TodosPage extends Component {
  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Backquote') {
        this.props.dispatch(toggleDebug());
      }
    });
  }

  render() {
    const dispatch = this.props.dispatch;
    const { todos, debug } = this.props.data;

    const onArchive = () => dispatch(archiveTodoItems());
    const onDestroy = (todo) => dispatch(deleteTodoItem(todo.id));
    const onAdd = (text) => {
      const today = new Date();
      const id = new Date().getTime();
      dispatch(addTodoItem(id, text, today));
    };
    const onDateChange = (todo, change) => {
      const newDate = addDays(todo.addedAt, change);
      dispatch(updateTodoItem(todo.id, newDate));
    };
    const onTodoToggle = (todo) => {
      const fn = todo.completedAt ? uncompleteTodoItem : completeTodoItem;
      dispatch(fn(todo.id));
    };

    const sortByAddedAt = (a, b) => new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime();

    const sweepButton = (
      <IconButton
        onClick={onArchive}
        disabled={!todos.some((todo) => todo.completedAt)}
      >
        <Archive />
      </IconButton>
    );

    const iconButtonElement = (<IconButton><MoreVertIcon /></IconButton>);

    const rightIconMenu = (todo) => {
      const upDate = addDays(todo.addedAt, -1);
      const downDate = addDays(todo.addedAt, 1);
      return (
        <IconMenu iconButtonElement={iconButtonElement}>
          <MenuItem
            primaryText={simpleFormatDate(upDate)}
            leftIcon={<NavigationArrowUpward />}
            onTouchTap={() => onDateChange(todo, -1)} />
          <MenuItem
            primaryText={simpleFormatDate(downDate)}
            leftIcon={<NavigationArrowDownward />}
            onTouchTap={() => onDateChange(todo, 1)} />
          <MenuItem
            primaryText="Delete"
            leftIcon={<ActionDelete />}
            onTouchTap={() => onDestroy(todo)} />
        </IconMenu>
      );
    };

    return (
      <div>
        <MainAppBar
          title="To do"
          iconElementRight={sweepButton}
        />
        <div className="page-content">
          <TodoGroups
            todos={todos}
            secondaryText={secondaryText}
            groupBy={t => groupForDate(t.addedAt)}
            sortComparator={sortByAddedAt}
            onToggle={onTodoToggle}
            itemRightIconButton={rightIconMenu}
          />
          <AddTodo onAdd={onAdd} />
          {debug && <StateDump data={this.props.data} /> }
        </div>
      </div>);
  }
}

// REDUX STUFF

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: {
      todos: unarchivedTodos(state.todos)
    }
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(TodosPage);
