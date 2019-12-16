import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 0,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 0
    }
  },
  shiftContent: {
    paddingLeft: 0
  },
  content: {
    height: '100%'
  }
}));

const Main = props => {
  const { children } = props;  

  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}
    >
      <main className={classes.content}>
        {children}
      </main>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node
};

export default Main;