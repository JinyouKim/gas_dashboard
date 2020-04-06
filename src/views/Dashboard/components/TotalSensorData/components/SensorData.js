import React, { Component } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import './SensorData.css';

import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Avatar,
} from '@material-ui/core';
import marker from 'image/marker.png'

require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/bullet')(Highcharts);


const useStyles = theme => ({
  root: {
    height: '45.55vh'
  },
  DataContainer: {
    height: '24vh',
    textAlign: 'center',
    marginTop: '1%'
  },
  actions: {
    justifyContent: 'flex-end'
  },
  chartContainer: {
    height: '10vh'
  },

  cardContent: {
  }
});


class SensorData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        chart: {
          backgroundColor: '#2A2F3D',
          inverted: true,
          type: 'bullet',
          marginTop: 0,
          animation: true,
          plotBorderColor:'#606053'
        },
        plotOptions: {
          series: {
            animation: true,
            dataLabels: {
              color:'#F0F0F3'
            },
            style :{
              fontSize:'13px'
            },
            marker: {
              lineColor:'#000'
            },
            color: '#000',
            borderWidth: 0,
            pointPadding: 0.2,
            targetOptions: {
              width:'0%'
            }
          },
          boxplot: {
            fillColor: '#505053'
          },
          candlestick:{
            lineColor: 'white'
          }

        },
        title: {
          text: null,
          style:{
            color:'#b8c4e6',
          }
        },
        subtitle: {
          text: null,
          style:{
            color:'#b8c4e6',
          }
        },
        legend: {
          enabled: false,
          itemStyle :{
            color:'#b8c4e6'
          }
        },
        xAxis: {
          categories: [],
          labels: {
            style: {
                color:'#b8c4e6',
                fill:'#b8c4e6'
            },
            text: {
              style: {
                color:'#b8c4e6',
                fill:'#b8c4e6'
              }
            }
          },
          lineColor:'#707073',
          minorGridLineColor:'#505053',
          title: {
            style:{
              color:'#b8c4e6'
            }
          }
        },
        yAxis: {
          max: 5000,
          plotBands: [{
            from: 0,
            to: 100,
            color: '#b2ff55'
          },
          {
            from: 100,
            to: 1000,
            color: '#fff771'
          },
          {
            from: 1000,
            to: 2000,
            color: '#ff803a'
          },
          {
            from: 2000,
            to: 3000,
            color: '#f8342d'
          },
          {
            from: 3000,
            to: 5000,
            color: '#55237d'
          }],
          title: null,
          labels: {
            style: {
                color:'#b8c4e6',
                fontFamily:'NanumGothic'
            }
          }          
        },
        series: [{
          data: [{
            y: 40,
            target: 0,
          }],
          

        }],
        tooltip: {
          backgroundColor: 'rgba(0,0,0,0.85)',
          style: {
            color: '#F0F0F0'
          },
          pointFormat: '<b>{point.y}</b>'
        },
        credits: {
          enabled: false
        }
      }
    }

  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps.sensorData)
  }

  render() {
    const { className, classes, ...rest } = this.props;
    const sensors = this.props.sensorData;
    const configs = [];

    if (sensors) sensors.sort((a, b) => {
      return a.sensor_id < b.sensor_id ? -1 : a.sensor_id > b.sensor_id ? 1 : 0;
    });

    for (let sensor in sensors) {
      const config = Object.assign({}, this.state.config);
      config.xAxis = {};
      config.xAxis.categories = ['<span class="hc-cat-title">' + sensors[sensor].sensor_id + '</span><br/>'];
      config.series = [{ data: [{ y: Number(sensors[sensor].value), target: 100 }]}];
      configs.push(config);
    }


    return (
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <CardHeader
          title={<div><img src={marker} width = "6px" height ="10px"/>  전체 센서 데이터</div> }          
          />
        <Divider />
        <CardContent className={clsx(classes.cardContent, className)}>
          <div className={classes.DataContainer}>
            {configs.map((config, i) => {
              console.log(config);
              return (
                <HighchartsReact highcharts={Highcharts} options={config} constructorType={'chart'} containerProps={{ className: 'chartContainer' }} key={i}></HighchartsReact>
              );

            })}
          </div>
        </CardContent>
      </Card>
    );
  }

}


SensorData.propTypes = {
  className: PropTypes.string
};



const mapStateToProps = (state) => {
  return {
    sensorData: state.sensor.sensorData,
    sensorInfos: state.sensor.sensorInfos,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(SensorData));
