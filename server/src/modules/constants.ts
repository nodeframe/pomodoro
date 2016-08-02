export const ServerIn = {
	CREATE_ROOM: 'create_room',
	TIMER_START: 'timer_start',
	TIMER_STOP: 'timer_stop',
	TIMER_PAUSE: 'timer_pause',
	JOIN_ROOM: 'join_room',
	SET_TIME: 'set_time',
	GET_ROOMS: 'get_rooms',
	GET_ROOM_DATA: 'get_room_data'
}

export const ServerOut = {
	ROOM_CREATED: 'room_created',
	JOIN_ROOM: 'join_room',
	TIME_START: 'time_start',
	TIME_STOP: 'time_stop',
	TIME_PAUSE: 'time_pause',
	TIME_COUNT: 'time_count',
	TIME_CHANGED: 'time_changed',
	LIST_ROOMS: 'list_rooms'
}

export enum Status {STOPPED,STARTED,PAUSED}