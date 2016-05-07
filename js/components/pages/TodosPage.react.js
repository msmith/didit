import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addTodoItem, completeTodoItem, uncompleteTodoItem, moveTodoItem, removeTodoItem, archiveTodoItems, toggleDebug } from '../../actions/AppActions';

// Components
import AddTodo from '../AddTodo.react';
import MainAppBar from '../MainAppBar.react';
import StateDump from '../StateDump.react';
import TodoGroups from '../TodoGroups.react';

// Material-UI components
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

// Material-UI icons
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionDoneAll from 'material-ui/svg-icons/action/done-all';
import ContentCreate from 'material-ui/svg-icons/content/create';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import NavigationArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';

// Helpers
import { formatDate, toDate } from '../../utils/dates'
import { unarchivedTodos } from '../../utils/todos'

const MS_PER_DAY = 24*60*60*1000;

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
      const newDate = new Date(new Date(todo.addedAt).getTime() + change * MS_PER_DAY);
      dispatch(moveTodoItem(todo.id, newDate));
    }
    const onTodoToggle = (todo) => {
      const fn = todo.completedAt ? uncompleteTodoItem : completeTodoItem;
      dispatch(fn(todo.id));
    };
    const sweepButton = (
      <IconButton onClick={onArchive}>
        <ActionDoneAll />
      </IconButton>
    );
    const addedAtDate = (todo) => toDate(todo.addedAt);

    const secondaryText = (todo) => {
      if (todo.completedAt) {
        return 'Completed ' + formatDate(todo.completedAt);
      }
    }

    const iconButtonElement = (<IconButton><MoreVertIcon /></IconButton>);

    const rightIconMenu = (todo) => (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem
          primaryText='-1 day'
          leftIcon={<NavigationArrowUpward />}
          onTouchTap={() => onDateChange(todo, -1)} />
        <MenuItem
          primaryText='+1 day'
          leftIcon={<NavigationArrowDownward />}
          onTouchTap={() => onDateChange(todo, 1)} />
        <MenuItem
          primaryText='Delete'
          leftIcon={<ActionDelete />}
          onTouchTap={() => onDestroy(todo)} />
      </IconMenu>
    );

    return (
      <div>
        <MainAppBar
          title='To do'
          iconElementRight={sweepButton}
        />
        <div className='page-content'>
          <TodoGroups
            todos={unarchivedTodos(todos)}
            secondaryText={secondaryText}
            onDestroy={onDestroy}
            onToggle={onTodoToggle}
            onDateChange={onDateChange}
            groupBy={addedAtDate}
            title={formatDate}
            itemRightIconButton={rightIconMenu}
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
