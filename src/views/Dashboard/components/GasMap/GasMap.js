import React, {Component} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import VworldMap from './VworldMap';
import {
  Card,
  CardHeader,
  CardContent,  
  Divider,
} from '@material-ui/core';

const useStyles = theme => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'

  },
  mapContainer: {
    height: '54.19vh',
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  }
});

class GasMap extends Component {
  render() {
    const {className, classes, ...rest}  = this.props;
    return (
      <Card
      {...rest}
      className={clsx(classes.root, className)}
      >
      <CardHeader        
        title="흥해지구"
      />
      <Divider />
      <CardContent>
        <div className={classes.mapContainer}>
            <VworldMap></VworldMap>
        </div>
      </CardContent>      
      </Card>

    );
  }

}

export default withStyles(useStyles)(GasMap);