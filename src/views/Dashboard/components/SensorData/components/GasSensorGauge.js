import React, {Component} from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import axios from 'axios';
import {connect} from 'react-redux'
import './GasSensorGauge.css';
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
    height: '32vh'
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
      sensorDataConfig: {
        chart: {
            type: 'solidgauge',
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
          max: 100,
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
            y:-70,
            text: 'Sensor Data'
          },
          labels: {
            y: 16
          }
        },
        series: [{
          name: 'Sensor Data',
          data: [3],
          dataLabels: {
            format:
            '<div style="text-align:center">' +
            '<span style="font-size:30px">{y}</span> ' +
            '<span style="font-size:18px;opacity:0.4">%</span>'+
            '</div>'
          },
          tooltip: {
            valueSuffix: "%"
          }
        }],
        
        plotOptions: {
          solidgauge: {
            dataLabels: {
              y: -40,
              borderWidth: 0,
              useHTML: true
            }
          }
        }
      }
    }
  }
  componentDidMount() {
    this.setState({timeout: null});
    const chart = this.chartComponent.current.chart;
    let getSensorData = () => {
      const sensorId = this.props.feature.values_.sensor_id;
      console.log(sensorId);
      axios.post('http://141.223.108.164:8080/sensor_value', {sensor_id: sensorId}).then(response =>{
        console.log(response.data[0].sensor_id);
          
        let series = chart.series[0];        
        series.setData([Number(response.data[0].value)]);
        this.setState({timeout:setTimeout(getSensorData, 1000*1)});
      });
  }
  getSensorData();
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
          title="센서 데이터"
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
      feature: state.sensorData.feature,
      sensorData: state.sensorData.data
    };
}
export default connect(mapStateToProps)(withStyles(useStyles)(GasSensorGauge));