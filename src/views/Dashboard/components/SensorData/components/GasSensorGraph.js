import React, {Component} from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
    Card,
    CardHeader,
    CardContent,  
    Divider,
  } from '@material-ui/core';

require('highcharts/highcharts-more')(Highcharts);

const windowHeight = window.innerHeight;
const calHeight = windowHeight;


const config = {
    chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
    },

    title: {
        text: 'Gas Sensor #1'
    },

    pane: {
        startAngle: -150,
        endAngle: 150,
        background: [{
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#FFF'],
                    [1, '#333']
                ]
            },
            borderWidth: 0,
            outerRadius: '109%'
        }, {
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#333'],
                    [1, '#FFF']
                ]
            },
            borderWidth: 1,
            outerRadius: '107%'
        }, {
            // default background
        }, {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%',
            innerRadius: '103%'
        }]
    },

    // the value axis
    yAxis: {
        min: 0,
        max: 100,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 'auto'
        },
        title: {
            text: ' %'
        },
        plotBands: [{
            from: 0,
            to: 80,
            color: '#55BF3B' // green
        }, {
            from: 80,
            to: 90,
            color: '#DDDF0D' // yellow
        }, {
            from: 90,
            to: 100,
            color: '#DF5353' // red
        }]
    },

    series: [{
        name: 'Speed',
        data: [80],
        tooltip: {
            valueSuffix: ' %'
        }
    }]

};

const useStyles = makeStyles(() => ({
    root: {
      height: '65vh'
    },
    GaugeContainer: {
      height: "100%",
      width: 'relative',
      position: 'relative'
    },
    actions: {
      justifyContent: 'flex-end'
    }
  }));

const GasSensorGauge = props => {
    const { className, ...rest } = props;
  
    const classes = useStyles();
  
    return (
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <CardHeader        
          title="센서 데이터"
        />
        <Divider />
        <CardContent>
          <div className={classes.GaugeContainer}>
            <HighchartsReact highcharts={Highcharts} options = {config} constructorType = {'chart'}></HighchartsReact>          
          </div>
        </CardContent>      
      </Card>
    );
  };

  GasSensorGauge.propTypes = {
    className: PropTypes.string
  };
  


export default GasSensorGauge;