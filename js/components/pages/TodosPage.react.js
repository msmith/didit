import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addTodoItem, completeTodoItem, uncompleteTodoItem, moveTodoItem, removeTodoItem, archiveTodoItems, toggleDebug } from '../../actions/AppActions';

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
import { MS_PER_DAY, formatDate, unarchivedTodos, addedAtDate } from '../../utils/todos';

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

    const visibleTodos = unarchivedTodos(todos);

    const onArchive = () => dispatch(archiveTodoItems());
    const onDestroy = (todo) => dispatch(removeTodoItem(todo.id));
    const onAdd = (text) => {
      const today = new Date();
      const id = new Date().getTime();
      dispatch(addTodoItem(id, text, today));
    };
    const onDateChange = (todo, change) => {
      const newDate = new Date(new Date(todo.addedAt).getTime() + change * MS_PER_DAY);
      dispatch(moveTodoItem(todo.id, newDate));
    };
    const onTodoToggle = (todo) => {
      const fn = todo.completedAt ? uncompleteTodoItem : completeTodoItem;
      dispatch(fn(todo.id));
    };

    const sweepButton = (
      <IconButton
        onClick={onArchive}
        disabled={!visibleTodos.some((todo) => todo.completedAt)}
      >
        <Archive />
      </IconButton>
    );

    const secondaryText = (todo) => {
      if (todo.completedAt) {
        return 'Completed ' + formatDate(todo.completedAt);
      }
    };

    const iconButtonElement = (<IconButton><MoreVertIcon /></IconButton>);

    const rightIconMenu = (todo) => (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem
          primaryText="-1 day"
          leftIcon={<NavigationArrowUpward />}
          onTouchTap={() => onDateChange(todo, -1)} />
        <MenuItem
          primaryText="+1 day"
          leftIcon={<NavigationArrowDownward />}
          onTouchTap={() => onDateChange(todo, 1)} />
        <MenuItem
          primaryText="Delete"
          leftIcon={<ActionDelete />}
          onTouchTap={() => onDestroy(todo)} />
      </IconMenu>
    );

    return (
      <div>
        <MainAppBar
          title="To do"
          iconElementRight={sweepButton}
        />
        <div className="page-content">
          <TodoGroups
            todos={visibleTodos}
            secondaryText={secondaryText}
            groupBy={addedAtDate}
            title={formatDate}
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
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(TodosPage);
