import {Status} from './constants';

export default class Room {
	private roomId:string
	private workTime:number
	private breakTime:number
	private startTime:Date
	private status:Status
	private users:string[]
	constructor(roomId:string,workTime:number,breakTime:number) {
		this.roomId = roomId
		this.workTime = workTime
		this.breakTime = breakTime
		this.status = Status.STOPPED
		this.users = []
	}
	private setStartTime():Date {return this.startTime = new Date()}
	public getStartTime():Date {return this.startTime}
	public getRoomId():string {return this.roomId}
	public setData(workTime:number,breakTime:number) {
		this.workTime = workTime
		this.breakTime = breakTime
	}
	public getWorkTime():number {return this.workTime}
	public getBreakTime():number {return this.breakTime}
	public start():Date {
		this.status = Status.STARTED
		return this.setStartTime()
	}
	public pause():void {this.status = Status.PAUSED}
	public stop():void {this.status = Status.STOPPED}

	public userJoinRoom(userSocketId:string) {this.users.push(userSocketId)}
	public userLeaveRoom(userSocketId:string) {
		let newUsers = this.users.filter((val) => val != userSocketId)
		this.users = newUsers
	}
	public getAllUserSocketId():string[] {return this.users}
}