"use strict"

var React = require('react');
var Chart = require('react-d3-core').Chart;
var LineChart = require('react-d3-basic').LineChart;

var chartData = require('./../stats_data/user.json');

var chartSeries = [
      {
        field: 'age',
        name: 'Age',
        color: '#ff7f0e'
      }
    ],
    // chart series,
    // field: is what field your data want to be selected
    // name: the name of the field that display in legend
    // color: what color is the line
    
    // your x accessor
    x = function(d) {
      return d.index;
    }

export default class Line extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 700,
      height: 300,
      series: chartSeries,
      margins: {left: 100, right: 100, top: 50, bottom: 50},
      title: "User sample"
    }
  }

  onClick(e) {
    this.setState({
      width: this.state.width === 700? 600: 700,
      height: this.state.width === 700? 400: 300,
      series: this.state.width === 700? [
          {
            field: 'age',
            name: 'Age',
            color: 'red'
          }
        ]: chartSeries
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.onClick.bind(this)}>toggle</button>
          <LineChart
            showXGrid= {true}
            showYGrid= {true}
            margins= {this.state.margins}
            title={this.state.title}
            data={chartData}
            width={this.state.width}
            height={this.state.height}
            chartSeries={this.state.series}
            x={x}
          />
      </div>
    )
  }
}