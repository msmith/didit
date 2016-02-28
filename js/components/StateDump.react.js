import React, { Component } from 'react';
import Paper from 'material-ui/lib/paper';

export default class StateDump extends Component {
  render() {
    return (
      <Paper zDepth={3} className='state-dump'>
        <pre>
        {JSON.stringify(this.props.data, null, 4)}
        </pre>
      </Paper>
    );
  }
}
