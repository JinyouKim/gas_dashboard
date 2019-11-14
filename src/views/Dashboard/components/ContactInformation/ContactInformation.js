import React, {Component} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardHeader, CardContent, Divider, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import PhotoIcon from '@material-ui/icons/Photo';
import {withStyles} from '@material-ui/core/styles';


const useStyles = theme => ({
  root: {
    height: '100%'
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

class ContactInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '김진유',
            number: '01051195799',
            email: 'jinyou91@postech.ac.kr',
            departure: '포항공대'
        };
    }
    
    render() {
        const {className, classes, ...rest} = this.props;
        return (     
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
    <CardHeader        
        title="관리자 정보"
    />
    <Divider/>
    <CardContent>
      <Grid
        container
        justify="space-between"
      >
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="h3"
            >
              {this.state.name}
            </Typography>
            <Typography variant="body1">부서: {this.state.departure}</Typography>
            <Typography variant="body1">연락처: {this.state.number}</Typography>
            <Typography variant="body1">이메일: {this.state.email}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <PhotoIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>

        );
    }    
}

export default withStyles(useStyles)(ContactInformation);