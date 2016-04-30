import React, { Component } from 'react';
import Checkbox from 'material-ui/lib/checkbox';
import Divider from 'material-ui/lib/divider';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
const moment = require('moment');

export default class TodoGroup extends Component {
  render() {
    const { title, todos, onToggle, onDestroy, onDateChange } = this.props;
    const formatDate = (date) => moment(date).format('ddd, MMM D');
    return (
      <div>
        <List subheader={title}>
        {todos.map(todo => {
          var secondaryText, checkbox;

          if (todo.completedAt) {
            secondaryText = formatDate(todo.completedAt);
          }

          if (onToggle) {
            checkbox = (<Checkbox
              defaultChecked={!!todo.completedAt}
              onCheck={() => onToggle(todo)}
            />);
          }

          return (
            <ListItem
              key={todo.id}
              primaryText={todo.text}
              secondaryText={secondaryText}
              leftCheckbox={checkbox}
            />);
        })}
        </List>
        <Divider />
      </div>
    );
  }
}
