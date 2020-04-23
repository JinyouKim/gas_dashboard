import React, { Component } from 'react';
import Highcharts from 'highcharts'
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import {clickSearchButton} from 'store/actions/index'

import {
  Card,
  CardContent,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Typography
} from '@material-ui/core';

require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/bullet')(Highcharts);


const useStyles = theme => ({
  root: {
    height: '8vh',
  },
  content: {
    padding: 0,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  container: {
      height: '90%'        
  },
  table: {
      height: '100%'
  },
  pagination:{
    height: '100%'  
  },
  stickyHeader: {
      height: '100%',
      backgroundColor: '#171924'
  },
  inner: {
    minWidth: 800,
    maxHeight: '20vh'
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    height: '20%',
    justifyContent: 'flex-end'
  },
  formControl : {
    flexGrow: 3,
    padding: '4px',
  },
  button :{
    flexGrow: 1,
  }
});


class SensorSearchBar extends Component {
  constructor(props) {
    super(props);    
    this.state ={
      district: '',
      sensorName: '',
      selectedSensorId: undefined,
      districtMap: new Array()
    }
  }
  componentWillReceiveProps(nextProps){    
  }

  render() {
    const { className, classes, ...rest } = this.props;
  
    const handleDistrictChange = event => {
      this.setState({districtMap: event.target.value.districtMap, district: event.target.value.district})
    }
    const handleSensorNameChange = event => {
      this.setState({sensorName: event.target.value.sensorName, selectedSensorId: event.target.value.sensorId})
    }

    const sensorMap = this.props.sensorMap;
    const searchMap = new Map();

    if (sensorMap) {
      for (let [sensorId, infoMap] of sensorMap) {
        const district = infoMap.get("district");
        if (!searchMap.has(district))
          searchMap.set(district, new Array())

        const rows = searchMap.get(district);
        rows.push( {
          sensorName: infoMap.get("sensor_name"),
          sensorId: sensorId
        });        
      }
    }        
    return (
      
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >      
        <CardContent className={clsx(classes.content, className)}>
          <FormControl variant = "outlined" className = {classes.formControl}>
            <InputLabel>
              <Typography variant = "h3">행정구역</Typography>
            </InputLabel>
            <Select
              value={this.state.district}              
              onChange={handleDistrictChange}
              renderValue = {()=> {return(this.state.district)}}
            >
              {
                Array.from(searchMap.keys()).map(district => {
                  return (<MenuItem value={{districtMap: searchMap.get(district), district: district}}>{district}</MenuItem>)
                })
              }
            </Select>

          </FormControl>

          <FormControl variant = "outlined" className = {classes.formControl}>
            <InputLabel>
              <Typography variant = "h3">센서이름</Typography>
            </InputLabel>
            <Select
              value={this.state.sensorName}        
              onChange={handleSensorNameChange}
              renderValue = {()=> {return(this.state.sensorName)}}
            >
              {
                this.state.districtMap.map(row => {
                    return(<MenuItem value={{sensorId:row['sensorId'],sensorName:row['sensorName']}}>{row['sensorName']}</MenuItem>)
                })
              }
            </Select>

          </FormControl>

          <Button 
            variant = "contained"
            color = "primary"
            className = {classes.button}
            onClick = {() => 
            { 
              console.log(this.state.district, this.state.selectedSensorId)              
              if (this.state.selectedSensorId)
                this.props.onClickSearchButton(this.state.selectedSensorId)
                this.setState({district: '', sensorName: '', selectedSensorId: undefined, districtMap: new Array()})
              
            }}>
            이동
          </Button>
        </CardContent>
      </Card>
    );
  }

}


const mapStateToProps = (state) => {
  return {
    sensorMap: state.sensor.sensorMap
  };
}

const mapDispatchToProps = (dispatch) => {  
  return {
    onClickSearchButton: (selectedSensorId) => {
      dispatch(clickSearchButton(selectedSensorId))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(SensorSearchBar));
