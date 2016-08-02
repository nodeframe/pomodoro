import React, {Component, PropTypes } from 'react';
import Bar from './../components/Stats_bar';
import Line from './../components/Stats_line';

export default class Stats extends React.Component {

  render () {
    return(
      <div>
        <Bar/>
        <Line/>
      </div>
    );
  }
}