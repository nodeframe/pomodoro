import * as ActionTypes from '../actions/ActionTypes';

export const initialState = {
    rooms: []
};

export function Reducers(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.GET_ROOMS:
          return{
            ...state,
            rooms: action.rooms
          }
        case ActionTypes.CREATE_ROOM:
          return{
            ...state,
            rooms: [...state.rooms, {roomId:action.roomId,startTime:0,workTime:action.workTime,breakTime:action.breakTime}]
          }
        default:
            return state
    }
}
