import React, { Component } from 'react';
import TextField from 'material-ui/lib/text-field';

export default class AddTodo extends Component {
  render() {
    const { onAdd } = this.props;
    const inputPlaceholder = "What're you doing today?";
    const textFieldStyle = { display: 'block', width: '100%' };
    return (
      <TextField
        hintText={inputPlaceholder}
        onEnterKeyDown={e => {
          const input = e.target;
          if (input.value) {
            onAdd(input.value);
            input.value = '';
          }
        }}
        style={textFieldStyle}
      />
    );
  }
}
