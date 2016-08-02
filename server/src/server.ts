/// <reference path="../../typings/index.d.ts" />
let express = require('express')
let app = express()
let http = require('http').Server(app)
let io = require('socket.io')(http)
let path = require('path')

let webpack = require('webpack')
let config = require('./../../webpack.config')
let compiler = webpack(config)

import State from './modules/state'

import {ServerIn,ServerOut,Status} from './modules/constants'

let state:State = new State()
let rootDir = path.join(__dirname + '../../../')

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))

app.use('/src', express.static(rootDir + 'src'))
app.use('/build', express.static(rootDir + 'build'))

app.get('/',(request,response) => {
	response.sendFile(rootDir + 'src/index.html')
})
app.get('/*', function(req, res) {
	res.sendFile(rootDir + 'src/index.html')
});

io.on('connection',(socket) => {

	console.log(socket.id + ' connected')

	// Room operations
	socket.on(ServerIn.CREATE_ROOM,(param) => {
		let workTime = param.workTime
		let breakTime = param.breakTime
		let roomId = state.addRoom(workTime,breakTime)
		// users[socket.id] = roomId
		state.userJoinRoom(socket.id,roomId)
		socket.join(roomId)
		io.emit(ServerOut.ROOM_CREATED,state.getRoomData(roomId))
	})
	socket.on(ServerIn.JOIN_ROOM,(param) => {
		let roomId = param.roomId
		let workTime = state.getRoomData(roomId).getWorkTime()
		let breakTime = state.getRoomData(roomId).getBreakTime()
		// users[socket.id] = roomId
		state.userJoinRoom(socket.id,roomId)
		socket.join(roomId)
		socket.emit(ServerOut.JOIN_ROOM,state.getRoomData(roomId))
	})

	// Room data operations
	socket.on(ServerIn.GET_ROOMS,() => {
		socket.emit(ServerOut.LIST_ROOMS,state.getRooms())
	})

	// Time operation
	socket.on(ServerIn.SET_TIME,(param) => {
		let workTime = param.workTime
		let breakTime = param.workTime
		let roomId = state.getUserData(socket.id).getRoomId()
		// let roomId = users[socket.id]
		// state.getRoomData(roomId).setData(workTime,breakTime)
		state.getRoomOfUser(socket.id).setData(workTime,breakTime)
		io.to(roomId).emit(ServerOut.TIME_CHANGED,{workTime,breakTime})
	})

	// start/stop/pause the time
	socket.on(ServerIn.TIMER_START,() => {
		let room = state.getRoomOfUser(socket.id)
		let startTime = room.start()
		let workTime = room.getWorkTime()
		let breakTime = room.getBreakTime()
		// let roomId = users[socket.id]
		// let startTime = state.getRoomData(roomId).start()
		// let workTime = state.getRoomData(roomId).getWorkTime()
		// let breakTime = state.getRoomData(roomId).getBreakTime()
		io.to(room.getRoomId()).emit(ServerOut.TIME_START,{startTime,workTime,breakTime})
	})
	socket.on(ServerIn.TIMER_STOP,() => {
		let room = state.getRoomOfUser(socket.id)
		// let roomId = users[socket.id]
		// state.getRoomData(roomId).stop()
		room.stop()
		io.to(room.getRoomId()).emit(ServerOut.TIME_STOP,{})
	})
	socket.on(ServerIn.TIMER_PAUSE,() => {
		let room = state.getRoomOfUser(socket.id)
		// let roomId = users[socket.id]
		// state.getRoomData(roomId).pause()
		room.pause()
		io.to(room.getRoomId()).emit(ServerOut.TIME_PAUSE,{})
	})

	// user disconnected
	socket.on('disconnected',() => {
		console.log(socket.id + ' is disconnected')
	})
})

http.listen(3000,() => {
	console.log('Listening at http://localhost:3000')
});

setInterval(() => io.emit(ServerOut.TIME_COUNT,{time: new Date()}),1000)
