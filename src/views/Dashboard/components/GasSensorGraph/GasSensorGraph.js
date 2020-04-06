import React, {Component} from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import './GasSensorGraph.css';
import {connect} from 'react-redux';
import marker from 'image/marker.png';

import {
    Card,
    CardHeader,
    CardContent,  
    Divider,
  } from '@material-ui/core';

require('highcharts/highcharts-more')(Highcharts);

const useStyles = theme => ({
    root: {
      height: '29.52vh'
    },
    DataContainer: {
      height: '24vh',
      textAlign: 'center'
    },
    actions: {
      justifyContent: 'flex-end'
    },
    chartContainer: {
        height:'100%'
    },
    cardContent : {
      height: '100%'
    }
});


class GasSensorGraph extends Component {
    constructor(props) {
        super(props);

        this.setState({lastUpdate:"", isRendered: false});
        this.chartComponent = React.createRef();

        this.state = {
            sensorId: '',
            config: {
                chart: {                    
                    type: 'spline',
                    animation: Highcharts.svg,
                    marginRight:10,
                    backgroundColor: '#2A2F3D'
                },
                title: {
                    text: null
                },
                xAxis: {
                    type: 'category',
                    tickPixelInterval: 150,
                    labels: {
                      style: {
                          color:'#FFFFFF'
                      }
                    }
                },
                yAxis: {
                    max: 3000,
                    min: 0,
                    title: {
                        text: 'sensor data',
                        style: {
                          color:'#FFFFFF'
                        }
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }],
                    labels: {
                      style: {
                          color:'#FFFFFF'
                      }
                    }
                },
                tooltip: {
                    headerFormat: '<b> {series.name}: {point.y}</b><br/>',
                    pointFormat: '날짜: {point.name}'
                },
                exporting: {
                    enabled: true
                },
                series: [{
                    name: '센서데이터',
                    data: [],
                    color: '#2E6FFD'    
                }],                
                credits: {
                    enabled:false
                },
                legend: {
                    enabled: false
                },
            }
        }

    }
    componentDidMount() {   
      this.setState({isRendered: true,});
    }
    componentWillReceiveProps(nextProps) {        
        if (this.state.isRendered){
          const chart = this.chartComponent.current.chart;
          const sensorId = nextProps.clickedSensorId;
          const sensorData = nextProps.sensorData;
          let values = null;          
          for(const i in sensorData) {
            values = sensorData[i];
            if(sensorId===values.sensor_id) {
              break;
            }
          }

          if(sensorId != this.state.sensorId) {           

            console.log(chart)

            this.setState({sensorId: sensorId});
          }

          if(this.state.lastUpdate !== values.date_created) {
            let series = chart.series[0]
            console.log(chart.series)
            let shift = series.data.length > 10;
            series.addPoint([values.date_created ,Number(values.value)], true, shift);        
            this.setState({lastUpdate:values.date_created});
          }         
          
        }

    }
    componentWillUnmount(){
    }
  
    render() {
      const {className, classes, ...rest}  = this.props;          
      return (
        <Card
          {...rest}
          className={clsx(classes.root, className)}
        >
          <CardHeader
                title={<div><img src={marker} width = "6px" height ="10px"/> 센서 시계열 데이터</div> }          
          />
          <Divider />
          <CardContent className={clsx(classes.cardContent, className)}>
            <div className={classes.DataContainer}>                         
                <HighchartsReact highcharts={Highcharts} options = {this.state.config} constructorType = {'chart'} containerProps={{className:'sensorTimeseriesContainer'}} ref={this.chartComponent}></HighchartsReact>               
            </div>
          </CardContent>      
        </Card>
      );
    }
  
  }  
  
  GasSensorGraph.propTypes = {
    className: PropTypes.string
};
    
  
const mapStateToProps = (state) => {   
    return {
      clickedSensorId: state.session.clickedSensorId,
      sensorData: state.sensor.sensorData
    };
  }

  
  export default connect(mapStateToProps) (withStyles(useStyles)(GasSensorGraph));
  
