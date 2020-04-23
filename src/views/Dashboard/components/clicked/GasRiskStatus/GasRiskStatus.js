import React, { Component } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Avatar,
} from '@material-ui/core';
import marker from 'image/marker.png'
import {facilityIcon1, facilityIcon2, facilityIcon3, facilityIcon4, facilityIcon0} from './icon/공공기관'
import {buildingIcon1, buildingIcon2, buildingIcon3, buildingIcon4, buildingIcon0} from './icon/일반건물'
import {houseIcon1, houseIcon2, houseIcon3, houseIcon4, houseIcon0} from './icon/주거시설'
import {governerIcon1, governerIcon2, governerIcon3, governerIcon4, governerIcon0} from './icon/정압기시설'
import {schoolIcon1, schoolIcon2, schoolIcon3, schoolIcon4, schoolIcon0} from './icon/학교시설'

require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/bullet')(Highcharts);


const useStyles = theme => ({
  root: {
    height: '29.52vh'
  },
  cardContent: {
  }
});


class GasRiskStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusImageMap: new Map(),
    }
    const statusImageMap = this.state.statusImageMap;
    statusImageMap.set('주거시설', new Map())
    statusImageMap.set('공공기관', new Map())
    statusImageMap.set('일반건물', new Map())
    statusImageMap.set('정압기시설', new Map())
    statusImageMap.set('학교시설', new Map())
    
    let imageMap = statusImageMap.get('주거시설');
    imageMap.set(0, houseIcon0);
    imageMap.set(1, houseIcon1);
    imageMap.set(2, houseIcon2);
    imageMap.set(3, houseIcon3);
    imageMap.set(4, houseIcon4);

    imageMap = statusImageMap.get('공공기관');
    imageMap.set(0, facilityIcon0);
    imageMap.set(1, facilityIcon1);
    imageMap.set(2, facilityIcon2);
    imageMap.set(3, facilityIcon3);
    imageMap.set(4, facilityIcon4);

    imageMap = statusImageMap.get('일반건물');
    imageMap.set(0, buildingIcon0)
    imageMap.set(1, buildingIcon1)
    imageMap.set(2, buildingIcon2)
    imageMap.set(3, buildingIcon3)
    imageMap.set(4, buildingIcon4)

    imageMap = statusImageMap.get('학교시설');
    imageMap.set(0, schoolIcon0);
    imageMap.set(1, schoolIcon1);
    imageMap.set(2, schoolIcon2);
    imageMap.set(3, schoolIcon3);
    imageMap.set(4, schoolIcon4);

    imageMap = statusImageMap.get('정압기시설');
    imageMap.set(0, governerIcon0);
    imageMap.set(1, governerIcon1);
    imageMap.set(2, governerIcon2);
    imageMap.set(3, governerIcon3);
    imageMap.set(4, governerIcon4);
  }
  componentWillReceiveProps(nextProps){
  }

  render() {
    const { className, classes, ...rest } = this.props;    
    const configs = [];
    const sensorInfoMap = this.props.sensorMap.get(this.props.clickedSensorId);

    const status = Number(sensorInfoMap.get('status'));
    const facilityName = this.props.facilityMap.get(sensorInfoMap.get('facility_id')).get('facility_name')

    console.log(status, facilityName);


    return (
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <CardHeader
          title={<div><img src={marker} width = "6px" height ="10px"/>  가스 위험 상태</div> }          
          />
        <Divider />
        <CardContent className={clsx(classes.cardContent, className)}>
          {/*status === 0 ? :*/}
        </CardContent>
      </Card>
    );
  }

}


const mapStateToProps = (state) => {
  return {
    sensorMap: state.sensor.sensorMap,
    isNewSensorData:state.sensor.isNewSensorData,
    clickedSensorId: state.session.clickedSensorId,
    facilityMap: state.sensor.facilityMap
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(GasRiskStatus));
