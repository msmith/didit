import React, { Component } from 'react';

// Material-UI components
import Paper from 'material-ui/Paper';

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
