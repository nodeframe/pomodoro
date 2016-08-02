import React, { PropTypes } from 'react';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import BtnCreateRoom from '../components/BtnCreateRoom';
import Room from '../components/Room';
import BtnRoom from '../components/BtnRoom';
import {setRooms,createRoom} from '../actions/TimerAction';
import RoomPage from './RoomPage';

var socket = io.connect('http://localhost:3000');
function mapDispatchToProps(dispatch) {
    return {
        SetRoom: (rooms) => dispatch(setRooms(rooms)),
        CreateRoom: (room) => dispatch(createRoom(room))
    };
}

function mapStateToProps(state) {
    return {
          rooms: state.rooms
    };
}

@connect(mapStateToProps,mapDispatchToProps)
class Team extends React.Component {
  constructor(props){
    super(props);
  }

  static contextTypes = {
          store: React.PropTypes.object
  };

  render () {
    return(
      <div>
        <RoomPage {...this.props} socket={socket} />
      </div>
    );
  }
}

export default Team;
