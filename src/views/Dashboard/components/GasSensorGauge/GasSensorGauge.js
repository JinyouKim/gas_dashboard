import React, {Component} from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import {} from "../../../../store/actions"
import {connect} from 'react-redux'
import './GasSensorGauge.css';
import marker from 'image/marker.png';
import {
    Card,
    CardHeader,
    CardContent,  
    Divider,
  } from '@material-ui/core';

require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);


const useStyles = theme => ({
  root: {
    height: '29.52vh'
  },
  GaugeContainer: {
    height: '26vh',
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  }
});


class GasSensorGauge extends Component {
  constructor(props) {
    super(props);
    this.chartComponent = React.createRef();
    this.state = {
      isRendered: true,
      sensorDataConfig: {
        chart: {
            type: 'solidgauge',
            backgroundColor: '#2A2F3D'            
        },
        title: null,
        credits: {
          enabled:false
        },
    
        pane: {
          center: ['50%', '70%'],
          size: '100%',
          startAngle: -90,
          endAngle: 90,
          background: {
            backgroundColor: '#EEE',
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc'
          }
        },
        exporting: {
          enabled: false      
        },
        tooltip: {
          enabled: false      
        },    
        yAxis: {
          min: 0,
          max: 3000,
          stops:[
            [0.1, '#55BF3B'],
            [0.5, '#DDDF0D'],
            [0.9, '#DF5353']
          ],
          lineWidth: 0,
          tickWidth: 0,
          minorTickInterval: null,
          tickAmount: 2,
          title: {
            y:-30,
          },
          labels: {
            style: {
              color:'#FFFFFF'
            },
              
            y: 16
          }
        },
        series: [{
          name: 'Sensor Data',
          data: [0],
          dataLabels: {
            format:
            '<div style="text-align:center">' +
            '<span style="font-size:42px;color:#ffffff">{y}</span> ' +
            '<span style="font-size:24px;color:#ffffff;opacity:0.4"></span>'+
            '</div>'
          },
          tooltip: {
            valueSuffix: "%"
          }
        }],
        
        plotOptions: {
          solidgauge: {
            dataLabels: {
              y: -45,
              borderWidth: 0,
              useHTML: true
            }
          }
        }
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.isRendered){
      const chart = this.chartComponent.current.chart;
      const sensorId = nextProps.clickedSensorId;
      const sensorData = nextProps.sensorData;

      let series = chart.series[0];
      console.log(sensorData,sensorId);

      for(const i in sensorData) {
        let values = sensorData[i];
        if(sensorId===values.sensor_id) {
          console.log(values.value);
          series.setData([Number(values.value)]);
          break;
        }
      }
      
    }

  }
  componentDidMount() {
    this.setState({isRendered: true,});    
  }
  componentWillUnmount() {
    clearTimeout(this.state.timeout);  
  }
  render() {
    const {className, classes, ...rest}  = this.props;
    
    return (
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <CardHeader
                title={<div><img src={marker} width = "6px" height ="10px"/> 센서 데이터</div> }          
        />
        <Divider />
        <CardContent>
          <div className={classes.GaugeContainer}>
            <HighchartsReact highcharts={Highcharts} options = {this.state.sensorDataConfig} constructorType = {'chart'} containerProps={{className:'sensorDataContainer'}} ref={this.chartComponent}></HighchartsReact>
          </div>
        </CardContent>      
      </Card>
    );
  }

}

  GasSensorGauge.propTypes = {
    className: PropTypes.string
  };  

  const mapStateToProps = (state) => {
    return {
      clickedSensorId: state.session.clickedSensorId,
      sensorData: state.sensor.sensorData
    };
  }
const mapDispatchToProps = (dispatch) => {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(GasSensorGauge));