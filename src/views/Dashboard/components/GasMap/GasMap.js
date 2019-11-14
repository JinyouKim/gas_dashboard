import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import VworldMap from './VworldMap';
import {
  Card,
  CardHeader,
  CardContent,  
  Divider,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    height: 800
  },
  mapContainer: {
    height: '100%',
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const GasMap = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

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
};

GasMap.propTypes = {
  className: PropTypes.string
};

export default GasMap;