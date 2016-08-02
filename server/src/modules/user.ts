export default class User {
	private socketId:string
	private userName:string
	private roomId:string
	private startTime:number
	constructor(socketId:string,userName?:string) {
		this.socketId = socketId
		this.userName = userName
	}
	public toDBObject():any {
		return {userName: this.userName,startTime: this.startTime,endTime: new Date().getTime()}
	}
	public joinRoom(roomId:string):void {this.roomId = roomId}
	public leaveRoom() {delete this.roomId}
	public getRoomId():string {return this.roomId}
}