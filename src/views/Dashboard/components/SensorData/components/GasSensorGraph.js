import React, {Component} from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import './GasSensorGraph.css';
import {connect} from 'react-redux';

import {
    Card,
    CardHeader,
    CardContent,  
    Divider,
  } from '@material-ui/core';

require('highcharts/highcharts-more')(Highcharts);

const useStyles = theme => ({
    root: {
      height: '32vh'
    },
    DataContainer: {
      height: '26vh',
      textAlign: 'center'
    },
    actions: {
      justifyContent: 'flex-end'
    },
    chartContainer: {
        height:'100px'
    },
});


class GasSensorGraph extends Component {
    constructor(props) {
        super(props);

        this.setState({lastUpdate:"", sensorId:""});
        this.chartComponent = React.createRef();

        this.state = {
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
                    max: 100,
                    min: 0,
                    title: {
                        text: 'sensor data (%)',
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
                    headerFormat: '<b> {series.name}: {point.y}%</b><br/>',
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
    }
    componentWillReceiveProps(nextProps) {        
        let data = nextProps.sensorData.data;
        console.log(this.sensorId);
        console.log(nextProps.clickedSensorId);
        if (this.sensorId !== nextProps.clickedSensorId) {
          const chart = this.chartComponent.current.chart;
          this.setState({sensorId: nextProps.clickedSensorId});          
        }        
        if(this.state.lastUpdate !== data.date_created) {
            const chart = this.chartComponent.current.chart;        
            let series = chart.series[0]
            let shift = series.data.length > 10;
            series.addPoint([data.date_created ,Number(data.value)], true, shift);        
            this.setState({lastUpdate:data.date_created});
        }

    }
    componentWillUnmount(){
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
            title="센서 시계열 데이터"
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
    console.log(state);    
    return {
        sensorData: state.sensorData,
        clickedSensorId: state.clickedFeature.feature.values_.sensor_id
    };
  }

  
  export default connect(mapStateToProps) (withStyles(useStyles)(GasSensorGraph));
  
