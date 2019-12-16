import React, {Component} from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import {connect} from 'react-redux';
import './SensorData.css';
import {receiveTotalSensorData} from '../../../../../store/actions'
import axios from 'axios';

import {
    Card,
    CardHeader,
    CardContent,  
    Divider,
  } from '@material-ui/core';

require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/bullet')(Highcharts);


const useStyles = theme => ({
    root: {
      height: '32vh'
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
        height:'100px'
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
                    inverted: true,
                    type: 'bullet',
                    marginTop: 0,
                    animation: true     
                },
                plotOptions: {
                  series: {
                    animation: true
                  }
                },
                title: {
                    text: null
                },
                legend: {
                    enabled: false
                },
                xAxis: {
                    categories:[]
                },
                yAxis: {
                    max: 100,
                    plotBands: [{
                        from: 0,
                        to: 40,
                        color: '#666'
                    },
                    {
                        from: 40,
                        to: 80,
                        color: '#999'
                    },
                    {
                        from: 80,
                        to: 100,
                        color: '#bbb'
                    }],
                    title: null
                },
                series: [{
                    data: [{
                        y: 40,
                        target: 0,
                    }],

                }],
                tooltip: {
                    pointFormat: '<b>{point.y}</b> %'
                },
                credits: {
                    enabled:false
                }
            }
        }

    }
    componentDidMount() {
      this.setState({});
      let getTotalSensorData = () => {
          axios.get('http://141.223.108.164:8080/sensor_total_value').then(response =>{
              this.props.onReceiveTotalSensorData(response.data);
              this.setState({timeout:setTimeout(getTotalSensorData, 1000*2)}); 
          });
      }
      getTotalSensorData();
    }
    componentWillUnmount() {
      clearTimeout(this.state.timeout);
    }
  
    render() {
      const {className, classes, ...rest}  = this.props;
      const sensors = this.props.totalSensorData.value;
      const configs = [];

      if (sensors) sensors.sort((a,b) => {
        return a.sensor_id < b.sensor_id ? -1: a.sensor_id>b.sensor_id? 1: 0;
      });       

      for (let sensor in sensors) {
        const config = Object.assign({}, this.state.config);
        config.xAxis = {};
        config.xAxis.categories = ['<span class="hc-cat-title">'+sensors[sensor].sensor_id+'</span><br/>'];
        config.series = [{data: [{y: Number(sensors[sensor].value), target: 0}]}];
        configs.push(config);
      }

           
      return (
        <Card
          {...rest}
          className={clsx(classes.root, className)}
        >
          <CardHeader        
            title="전체 센서 데이터"
          />
          <Divider />
          <CardContent className={clsx(classes.cardContent, className)}>
            <div className={classes.DataContainer}>
              {configs.map((config, i) => {
                console.log(config);
                return (                  
                  <HighchartsReact highcharts={Highcharts} options = {config} constructorType = {'chart'} containerProps={{className:'chartContainer'}} key = {i}></HighchartsReact>
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
      totalSensorData: state.totalSensorData,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
      onReceiveTotalSensorData: (value) => {
          dispatch(receiveTotalSensorData(value))
      }
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(useStyles)(SensorData));
