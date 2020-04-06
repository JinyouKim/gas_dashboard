import React, {Component} from 'react';
import clsx from 'clsx';
import { Card, CardHeader, CardContent, Divider} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import { connect } from 'react-redux';
import marker from 'image/marker.png';


const useStyles = theme => ({
  root: {
    height: '30.55vh'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  icon: {
      height: 100,
      width: 100     
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.icon,
    height: 100,
    width: 100
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.error.dark
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  }
});

class SensorImage extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {            
        };
    }
    render() {
      const { className, classes, ...rest } = this.props;

      const sensorId= this.props.clickedSensorId
      let sensorImagePath = "http://141.223.108.164:8080/sensor_image/"+sensorId;
      console.log(sensorImagePath)
      
      return(
        <Card
        {...rest}
        className={clsx(classes.root, className)}
        >
          <CardHeader
                title={<div><img src={marker} width = "6px" height ="10px"/> 센서 이미지</div> }          
          />
          <Divider />
          <CardContent className={clsx(classes.cardContent, className)}>
            <img src={sensorImagePath} width="100%" height="auto"/>
          </CardContent>
        </Card>

      );
    }
    
}

const mapStateToProps = (state) => {
  return {
    clickedSensorId: state.session.clickedSensorId
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(useStyles)(SensorImage));