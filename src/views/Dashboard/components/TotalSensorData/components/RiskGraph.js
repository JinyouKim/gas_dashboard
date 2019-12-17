import React, {Component} from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

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
    componentDidMount() {
      this.setState({timeout: null});
      const chart = this.chartComponent.current.chart;
      let getRiskInfo = () => {
          axios.get('http://141.223.108.164:8080/risk_info').then(response =>{
              let series = chart.series[0]
              let shift = series.data.length > 10;
              series.addPoint([response.data[0].date_created ,Number(response.data[0].value)], true, shift);
              this.setState({timeout:setTimeout(getRiskInfo, 1000*5)});
          });
      }
      getRiskInfo();
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
            title="센서 분석 정보"
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
    
  

export default withStyles(useStyles)(RiskGraph);
