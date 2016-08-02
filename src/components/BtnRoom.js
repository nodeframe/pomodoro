import React, { PropTypes } from 'react'

class BtnRoom extends React.Component {
  render () {
    return(
      <button>Room{this.props.roomId}</button>
    );
  }
}

export default BtnRoom;
