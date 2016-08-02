import React, { PropTypes } from 'react';
import BtnRoom from './BtnRoom';

class Room extends React.Component {
  constructor(props) {
      super(props);
  }
  render() {
      return (
          <div className="room">
                {this.props.children}
          </div>
      );
  }
}

export default Room;
