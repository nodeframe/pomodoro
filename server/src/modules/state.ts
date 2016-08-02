import Room from './room'
import User from './user'
import {Status} from './constants'

class State {
	private numRoom:number
	private rooms:Room[]
	private users:User[]
	public constructor() {
		this.numRoom = 0
		this.rooms = []
		this.users = []
	}

	// rooms
	public addRoom(workTime:number,breakTime:number):string {
		let roomName = (this.numRoom++).toString()
		this.rooms[roomName] = new Room(roomName,workTime,breakTime)
		return roomName
	}
	public removeRoom(roomId:string):void {delete this.rooms[roomId]}
	public getRooms():Room[] {
		let ret:Room[] = []
		for(var key in this.rooms)	ret.push(this.rooms[key])
		return ret
	}
	public getRoomData(roomId:string):Room {return this.rooms[roomId]}

	// users
	public addUser(socketId:string,userName?:string):void {this.users[socketId] = new User(socketId,userName)}
	public removeUser(socketId:string):void {delete this.users[socketId]}
	public getUsers():User[] {
		let ret:User[] = []
		for(var key in this.users)	ret.push(this.users[key])
		return ret
	}
	public getUserData(socketId:string):User {return this.users[socketId]}

	// rooms & users
	public getRoomOfUser(socketId:string) {return this.getRoomData(this.getUserData(socketId).getRoomId())}
	public getUsersInRoom(roomId:string):User[] {return this.getRoomData(roomId).getAllUserSocketId().map((val) => this.users[val])}
	public userJoinRoom(socketId:string,roomId:string):void {
		this.getUserData(socketId).joinRoom(roomId)
		this.getRoomData(roomId).userJoinRoom(socketId)
	}
	public userLeaveRoom(socketId:string):void {
		let roomId:string = this.getUserData(socketId).getRoomId()
		this.getUserData(socketId).leaveRoom()
		this.getRoomData(roomId).userLeaveRoom(socketId)
	}
}

export default State