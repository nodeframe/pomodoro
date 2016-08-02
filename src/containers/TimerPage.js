import React, { PropTypes } from 'react';
import {pomoTime} from '../components/TimeFunc';

class TimerPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      startTime: 0,
      workTime: 0,
      breakTime: 0,
      time: 0,
      work: false,
      text: ''
    }
  }
  handleClickStart(e){
    const {socket} = this.props;
    socket.emit('timer_start');
  }
  componentDidMount() {
    const {socket} = this.props;
    socket.on('time_start', this.handleStartTimer.bind(this));
    socket.on('time_count', this.handleTimeCount.bind(this));
  }
  handleStartTimer(startTimer){
    this.setState({startTime:startTimer.startTime,workTime:startTimer.workTime,breakTime:startTimer.breakTime,work:true})
  }
  handleTimeCount(time){
    this.setState({time:time.time});
    if(this.state.work){
      var timer = pomoTime(this.state.startTime,this.state.time,this.state.workTime,this.state.breakTime);
      this.setState({text: 'min:'+timer.minutes+'sec:'+timer.seconds})
      if(!timer.isWorking){
        console.log('break');
      }
    }
  }
  render () {
    return(
      <div>
        <button onClick = {this.handleClickStart.bind(this)}>Start</button>
        {this.state.text}
      </div>
    );
  }
}

export default TimerPage;
