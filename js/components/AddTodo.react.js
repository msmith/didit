import React, { Component } from 'react';

export default class AddTodo extends Component {
  render() {
    const { onAdd } = this.props;
    const inputPlaceholder = "What're you doing today?";
    return (
      <form className='add_todo' onSubmit={(e) => {
        e.preventDefault();
        if (this.input.value) {
          onAdd(this.input.value);
          this.input.value = '';
        }
      }}>
        <input className='form-control' ref={node => {
          this.input = node;
        }} placeholder={inputPlaceholder}/>
      </form>
    );
  }
}
