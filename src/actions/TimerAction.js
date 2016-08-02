import * as ActionTypes from './ActionTypes';

export function setRooms(rooms){
  return{
    type: ActionTypes.GET_ROOMS,
    rooms: rooms
  }
}

export function createRoom(room){
  return{
    type: ActionTypes.CREATE_ROOM,
    roomId: room.roomId,
    breakTime: room.breakTime,
    workTime: room.breakTime
  }
}

export function startTime(time){
  return{
    type:ActionTypes.START_TIME,
    time:time
  }
}
