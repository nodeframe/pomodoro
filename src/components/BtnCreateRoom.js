import React, { PropTypes } from 'react'

class BtnCreateRoom extends React.Component {
  constructor(props){
    super(props);
  }

  render () {
    return(
      <div>
        <form onSubmit = {this.props.submit}>
          Min:<input name = "workTimeMin"> </input>
          Sec:<input name = "workTimeSec"> </input>
          <br/>
          Min:<input name = "breakTimeMin"> </input>
          Sec:<input name = "breakTimeSec"> </input>
          <button>CreateRoom</button>
        </form>
      </div>
    );
  }
}

export default BtnCreateRoom;
