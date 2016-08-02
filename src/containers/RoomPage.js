import React, { PropTypes } from 'react';
import {setRooms,createRoom} from '../actions/TimerAction';
import BtnCreateRoom from '../components/BtnCreateRoom';
import Room from '../components/Room';
import BtnRoom from '../components/BtnRoom';
import TimerPage from './TimerPage';

class RoomPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {socket} = this.props;
    socket.emit('get_rooms');
  }

  componentDidMount() {
    const {socket} = this.props;
    socket.on('room_created', this.handleRoomCreate.bind(this));
    socket.on('list_rooms', this.handleSetRoom.bind(this));
  }

  handleSubmit(e){
    e.preventDefault();
    const {socket} = this.props;
    var workTime = (e.target.workTimeMin.value*60)+(e.target.workTimeSec.value*1);
    var breakTime = (e.target.breakTimeMin.value*60)+(e.target.breakTimeSec.value*1);
    console.log(workTime);
    var room = {workTime,breakTime};
    socket.emit('create_room', room)
  }

  handleRoomCreate(room){
    this.props.CreateRoom(room);
  }

  handleSetRoom(rooms){
    this.props.SetRoom(rooms);
  }
  render () {
    return(
      <div>
        <Room>
          {this.props.rooms.map((v,i)=><BtnRoom roomId = {v.roomId} key = {i}></BtnRoom>)}
        </Room>
        <BtnCreateRoom submit = {this.handleSubmit.bind(this)}></BtnCreateRoom>
        <TimerPage {...this.props}></TimerPage>
      </div>
    );
  }
}

export default RoomPage;
