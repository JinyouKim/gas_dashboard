import React, {Component} from 'react';
import clsx from 'clsx';
import { Card, CardHeader, CardContent, Divider, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import PhotoIcon from '@material-ui/icons/Photo';
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios';
import { connect } from 'react-redux';
import marker from 'image/marker.png';


const useStyles = theme => ({
  root: {
    height: '29.52vh'
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

class SensorMalfunctionInfo extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const {className, classes, ...rest} = this.props;
        const sensorId = this.props.clickedSensorId;
        if (this.state.sensorId != sensorId) {        
          let getUserInfo = () => {
            axios.get('http://141.223.108.164:8080/user?sensor_id='+sensorId).then(response =>{
              const userInfo = response.data[0];
              this.setState({name: userInfo.user_name, phone: userInfo.user_phone, mail: userInfo.user_mail, id: userInfo.user_id, sensorId: sensorId})              
            })            
          }
          getUserInfo();          
        }
        return(
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
    <CardHeader
      title={<div><img src={marker} width = "6px" height ="10px"/> 관리자 정보</div> }          
    />
    <Divider/>
    <CardContent>
      <Grid
        container
        justify="space-between"
      >
          <Grid item>
            <img src={"http://141.223.108.164:8080/user_image/"+this.state.id} width="50%" height="auto"/>           
          </Grid>
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="h3"
            >
              {this.state.name}
            </Typography>
            <Typography variant="h5">연락처: {this.state.phone}</Typography>
            <Typography variant="h5">이메일: {this.state.mail}</Typography>
          </Grid>          
        </Grid>
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

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(useStyles)(ContactInformation));