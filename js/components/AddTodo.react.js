import React, { Component } from 'react';

export default class AddTodo extends Component {
  render() {
    const { onAdd } = this.props;
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        if (this.input.value) {
          onAdd(this.input.value)
          this.input.value = ""
        }
      }}>
        <input ref={node => {
          this.input = node;
        }} />
      </form>
    )
  }
};
