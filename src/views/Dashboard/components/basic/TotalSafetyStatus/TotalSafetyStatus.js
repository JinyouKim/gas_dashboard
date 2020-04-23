import React, { Component } from 'react';
import Highcharts from 'highcharts'
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import axios from 'axios';

import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableHead,
  TableCell,
  TableContainer,
  TableBody,
  TableRow,
} from '@material-ui/core';
import marker from 'image/marker.png'
import facilityIcon from './icon/공공기관.png'
import buildingIcon from './icon/일반건물.png'
import governerIcon from './icon/정압기시설.png'
import houseIcon from './icon/주거시설.png'
import schoolIcon from './icon/학교시설.png'


require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/bullet')(Highcharts);


const useStyles = theme => ({
  root: {
    height: '82vh'
  },
  CardContent: {
    padding: 0,
    height: '100%'
  },
  container: {
      height: '90%'        
  },
  table: {
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
  columnCell: {
    fontSize: '18px',
    color: 'white',
    backgroundColor: '#2A2F3D',
  },
  rowFacilityCell: {
    fontSize: '16px',
    //fontFamily: "NanumGothicB",
    color: 'white',
    backgroundColor: '#2A2F3D',
    borderBottom : "0px"
  },
  rowNormalNumberCell: {
    fontSize: '30px',
    fontFamily: "NanumGothicB",
    color: 'white',
    backgroundColor: '#2A2F3D',
    borderBottom : "0px"
  },
  rowAbnormalNumberCell: {
    fontSize: '30px',
    fontFamily: "NanumGothicB",
    color: 'red',
    backgroundColor: '#2A2F3D',
    borderBottom : "0px"
  },
  rowMalfunctionNumberCell: {
    fontSize: '30px',
    fontFamily: "NanumGothicB",
    color: 'yellow',
    backgroundColor: '#2A2F3D',
    borderBottom : "0px"
  },
  icon: {
    paddingBottom: '10px',
    paddingTop: '20px'
  }
});


class TotalSafetyStatus extends Component {
  constructor(props) {
    super(props);   

  }
  componentWillReceiveProps(nextProps){ 
    console.log(nextProps.facilityMap);
  }

  render() {
    const { className, classes, ...rest } = this.props;
    const columns = [
      {id: 'facility_name', label:'', minwidth: 10, align: 'center'},
      {id: 'normal', label: '정상 시설', minWidth: 10, align: 'center'},
      {id: 'abnormal', label: '이상 시설', minWidth: 10, align: 'center'},
      {id: 'malfunction', label: '고장 시설', minWidth: 10, align: 'center'},
  ]
    

    const rows = new Array();
    const facilityMap = this.props.facilityMap;
   
    if (facilityMap) {
      for (let [facilityId, infoMap] of facilityMap) {
        rows.push({
          facility_id: facilityId,
          facility_name: infoMap.get("facility_name"), 
          normal: infoMap.get("normal"),
          abnormal: infoMap.get("abnormal"),
          malfunction: infoMap.get("malfunction"),
        })
      }
    }

    return (
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <CardHeader
          title={<div><img src={marker} width = "9px" height ="15px"/>   시설물 안전 상태</div> }          
          />

        <Divider />
        <CardContent className={clsx(classes.cardContent, className)}>
          <TableContainer className ={classes.container}>  
            <Table stickyHeader className = {classes.table}>
                <TableHead>
                    <TableRow>
                        {columns.map(column => (
                            <TableCell key = {column.id} align={column.align} style ={{minWidth: column.minWidth, height: '45px'}} className = {classes.columnCell}>
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => {                      
                      return(
                        <TableRow hover tabIndex = {-1}>
                          {columns.map(column => {
                              const value = row[column.id];
                              return (
                                  <TableCell key={column.id} align={column.align} 
                                              className = {column.id === "facility_name"? classes.rowFacilityCell:
                                                           value === 0 || column.id === "normal"? classes.rowNormalNumberCell:
                                                           column.id === "abnormal"? classes.rowAbnormalNumberCell:
                                                           classes.rowMalfunctionNumberCell}>
                                    {                                      
                                      column.id === "facility_name"
                                        ? <div>
                                            <img src= {value === "공공기관" ? 
                                                        facilityIcon: value==="일반건물" ? 
                                                        buildingIcon: value==="정압기시설" ? 
                                                        governerIcon: value==="주거시설" ?
                                                         houseIcon:schoolIcon} className={classes.icon}/> 
                                              <div>
                                                {value}
                                              </div>
                                          </div>
                                        : value
                                    }                                      
                                  </TableCell>
                              )
                          })}

                        </TableRow>
                      )
                    })}                 
                </TableBody>
            </Table>                    
            </TableContainer>
        </CardContent>
      </Card>
    );
  }

}


const mapStateToProps = (state) => {
  return {
    facilityMap: state.sensor.facilityMap,
    sensorMap: state.sensor.sensorMap,
    isNewSensorData:state.sensor.isNewSensorData
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(TotalSafetyStatus));
