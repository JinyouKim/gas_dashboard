import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import clsx from 'clsx';
import axios from 'axios';
import {receivePipeData, receiveAllSensorInfo, receiveAllSensorData,receiveLogData, receiveDistrictDanger, receiveTotalSensorStatus} from '../../store/actions/index'


import {
    GasMap,
    LogTable,
    ContactInformation,
    TotalSensorData,
    SensorImage,
    GasSensorGauge,
    GasSensorGraph,
    SensorInfoTable
} from './components'

const useStyles = theme => ({
    '@global': {
        '*::-webkit-scrollbar': {
          width: '5px',
          backgroundColor: 'F5F5F5'
        },
        '*::-webkit-scrollbar-track': {            
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.3)',
          borderRadius: '10px',
          backgroundColor: 'F5F5F5'
          
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: '#818fb5',
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.3)',
          borderRadius: '10px'
        }
    },
    root: {
        height: "100%",
        paddingTop: '33px',
        paddingBottom: '33px',
        paddingLeft: '40px',
        paddingRight: '40px',
    }
});

class Dashboard extends Component {
    constructor(props) {        
        super(props);
        this.state = {
            isReceivingSensorData: false,
            dashboard: <div></div>            
        };
        let getPipeData = () => {
            axios.get('http://141.223.108.164:8080/geojson').then(response =>{
                this.props.onReceivePipeData(response.data);
            });
        }
        let getSensorInfo = () => {
            axios.get('http://141.223.108.164:8080/all_sensor_info').then(response =>{
                this.props.onReceiveAllSensorInfo(response.data);            
            });
        }

        let getLogData = () => {
            axios.get('http://141.223.108.164:8080/status_log').then(response => {
              this.props.onReceiveLogData(response.data);
              this.setState({ logDataTimeout: setTimeout(getLogData, 1000 * 60) });
            });
        }       
       
        getPipeData();
        getSensorInfo();  
        getLogData();
        
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.sensorInfos.length != 0 && !this.state.isReceivingSensorData) {
            const sensors = nextProps.sensorInfos;
            let sensor_ids = [];
            for (const i in sensors)
                sensor_ids.push(sensors[i].sensor_id)              
            
            const requestStr = sensor_ids.join("+");           
            
            let getTotalSensorData = () => {
                axios.get('http://141.223.108.164:8080/sensor_value?sensor_id='+requestStr).then(response => {
                  this.props.onReceiveAllSensorData(response.data);
                  this.setState({ sensorDataTimeout: setTimeout(getTotalSensorData, 1000 * 2) });
                });
            }
            let getTotalSensorStatus = () => {
                axios.get('http://141.223.108.164:8080/sensor_status').then(response => {
                  this.props.onReceiveTotalSensorStatus(response.data);
                  this.setState({ totalSensorStatusTimeout: setTimeout(getTotalSensorStatus, 1000 * 2) });
                });
            }
            let getDistrictDanger = () => {
                axios.get('http://141.223.108.164:8080/district_danger').then(response => {
                  this.props.onReceiveDistrictDanger(response.data);
                  this.setState({ districtDangerTimeout: setTimeout(getDistrictDanger, 1000 * 2) });
                });
            }
            getTotalSensorData();
            getDistrictDanger();
            //getTotalSensorStatus();
            //clearTimeout(this.state.timeout);
            this.state.isReceivingSensorData = true;           
        }

        if (nextProps.pageState == 0) {
            this.setState({dashboard:
                <Grid container spacing = {2} direction="row">
                    <Grid item xs={9}> 
                        <Grid container spacing = {2} direction="column">
                            <Grid item xs = {12}>
                                <GasMap/>                                                            
                            </Grid>
                            <Grid item xs = {12}>
                                <LogTable/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs = {3}>
                        <TotalSensorData/>
                    </Grid>
                </Grid>
            })
        }
        else if(nextProps.pageState == 1) {
            this.setState({dashboard:
            <Grid container spacing = {2} direction="row">
                <Grid item xs={8}> 
                    <Grid container spacing = {2} direction="row">
                        <Grid item xs = {12}>
                            <GasMap/>
                        </Grid>
                        <Grid item xs = {12}>
                            <Grid container spacing = {2} direction="row">
                                <Grid item xs = {8}>
                                    <LogTable/> 
                                </Grid>
                                <Grid item xs = {4}>
                                    <SensorImage/>
                                </Grid>
                            </Grid>                          
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs = {4}>
                    <Grid container spacing = {2} direction="row">
                        <Grid item xs= {6}>                            
                            <GasSensorGauge></GasSensorGauge>
                        </Grid>
                        <Grid item xs= {6}>
                            <ContactInformation></ContactInformation>
                        </Grid>
                        <Grid item xs= {12}>
                            <GasSensorGraph></GasSensorGraph>
                        </Grid>
                        <Grid item xs= {12}>
                            <SensorInfoTable></SensorInfoTable>
                        </Grid>                        
                    </Grid>                    
                </Grid>
            </Grid>
            })
        }


    }
    render() {
        const {className, classes, ...rest} = this.props
        let dashboard = <div></div>
        

        return (
            <div className ={clsx(classes.root, className)}>
                {this.state.dashboard}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        pageState: state.session.pageState,
        sensorInfos: state.sensor.sensorInfos
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onReceivePipeData: (pipeData) => {
            dispatch(receivePipeData(pipeData))
        },
        onReceiveAllSensorInfo: (sensorInfos) =>{
            dispatch(receiveAllSensorInfo(sensorInfos))
        },
        onReceiveAllSensorData: (sensorData) => {
            dispatch(receiveAllSensorData(sensorData))
        },
        onReceiveLogData: (logData) => {
            dispatch(receiveLogData(logData))
        },
        onReceiveDistrictDanger: (districtDanger) => {
            dispatch(receiveDistrictDanger(districtDanger))
        },
        onReceiveTotalSensorStatus: (totalSensorStatus) => {
            dispatch(receiveTotalSensorStatus(totalSensorStatus))
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Dashboard));