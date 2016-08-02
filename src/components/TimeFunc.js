'use strict'
export function pomoTime(startTime,currentTime,workTime,breakTime) {
	startTime = new Date(startTime).getTime()
	currentTime = new Date(currentTime).getTime()
	workTime = parseInt(workTime)
	breakTime = parseInt(breakTime)
	let onePomo = workTime + breakTime
	let timeSecond = Math.floor((currentTime - startTime) / 1000)
	let remaining = timeSecond % onePomo
	let isWorking = remaining <= workTime
	if((timeSecond % onePomo) > workTime)	remaining -= workTime
	remaining = (isWorking ? workTime:breakTime) - remaining
	return {
		isWorking: isWorking,
		numPomo: Math.floor(timeSecond / onePomo),
		minutes: Math.floor(remaining / 60),
		seconds: remaining % 60
	}
}
