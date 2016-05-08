import React, { Component } from 'react';

// Material-UI components
import TextField from 'material-ui/TextField';

export default class AddTodo extends Component {
  render() {
    const { onAdd } = this.props;
    const inputPlaceholder = "What're you doing today?";
    const textFieldStyle = {
      'display': 'block', 'width': 'auto'
    };
    return (
      <TextField
        hintText={inputPlaceholder}
        onKeyDown={e => {
          if (e.keyCode === 13) {
            const input = e.target;
            if (input.value) {
              onAdd(input.value);
              input.value = '';
            }
          }
        }}
        className = "add-todo"
        style={textFieldStyle}
      />
    );
  }
}
