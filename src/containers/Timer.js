import React from 'react';
import TurnipClock from '../components/TurnipClock';
import ShowTime from '../components/ShowTime';
import { connect } from 'react-redux';
import {test,countDownWorktime} from '../actions/TimerAction';

function mapDispatchToProps(dispatch) {
    return {
        countDownWorktime: (timer) => dispatch(countDownWorktime(timer))
    };
}

function mapStateToProps(state) {
    return {
          timer: state.timer
    };
}

@connect(mapStateToProps, mapDispatchToProps)
class Timer extends React.Component {

  static contextTypes = {
          store: React.PropTypes.object
      };

  handdleChangeTurnip(timer){
    console.log(this.props.timer);
    this.props.countDownWorktime(timer);
  }

  render (){
    return(
      <div>
        <TurnipClock>
          <ShowTime  turnipChange = {() => this.handdleChangeTurnip(this.props.timer)} sec ={this.props.timer.sec} min = {this.props.timer.min} turnip = {this.props.timer.turnip}/>
        </TurnipClock>
      </div>
    );
  }
}

export default Timer;
