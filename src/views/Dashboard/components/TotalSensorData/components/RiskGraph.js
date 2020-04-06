import React, {Component} from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { connect } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import './RiskGraph.css';
import axios from 'axios';

import {
    Card,
    CardHeader,
    CardContent,  
    Divider,
  } from '@material-ui/core';
import marker from 'image/marker.png'
require('highcharts/highcharts-more')(Highcharts);

const useStyles = theme => ({
    root: {
        height: '45.56vh'
    },
    DataContainer: {
      height: '40vh',
      textAlign: 'center'
    },
    actions: {
      justifyContent: 'flex-end'
    },
    chartContainer: {
        height:'100px'
    },
});


class RiskGraph extends Component {
    constructor(props) {
        super(props);
        this.chartComponent = React.createRef();

        this.state = {
            config: {
                chart: {
                    type: 'spline',
                    animation: Highcharts.svg,
                    marginRight:10,
                    backgroundColor: '#2A2F3D',
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
                        text: 'risk ratio (%)',
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
                    headerFormat: '<b>{series.name}: {point.y}%</b><br/>',
                    pointFormat: '날짜: {point.name}'
                },
                exporting: {
                    enabled: true
                },
                series: [{
                    name: '위험도',
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

    componentWillReceiveProps(nextProps){
        const chart = this.chartComponent.current.chart;
        let series = chart.series[0]
        let shift = series.data.length > 10;
        let districtDanger = nextProps.districtDanger[0];
        series.addPoint([districtDanger.date_created ,Number(districtDanger.district_risk)], true, shift);

    }
    componentDidMount() {
        console.log(this.props);
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
          title={<div><img src={marker} width = "6px" height ="10px"/> 지역 가스 위험도</div> }          
          />
          <Divider />
          <CardContent className={clsx(classes.cardContent, className)}>
            <div className={classes.DataContainer}>                         
                <HighchartsReact highcharts={Highcharts} options = {this.state.config} constructorType = {'chart'} containerProps={{className:'graphContainer'}} ref={this.chartComponent}></HighchartsReact>               
            </div>
          </CardContent>      
        </Card>
      );
    }
  
  }
  
  
RiskGraph.propTypes = {
    className: PropTypes.string
};
    
const mapStateToProps = (state) => {
    return {
      districtDanger: state.sensor.districtDanger,
    };
  }
 
export default connect(mapStateToProps)(withStyles(useStyles)(RiskGraph));
