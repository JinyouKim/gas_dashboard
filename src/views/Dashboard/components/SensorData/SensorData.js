import React from 'react'
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'


import {
    GasSensorGauge,
} from './components'

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%",
        padding: '0vh'        
    }

}));


const SensorData = () => {
    const classes = useStyles();

    return (
        <div className ={classes.root}>
            <Grid container spacing = {2} direction="row">
                <Grid item xs={6}>
                    <GasSensorGauge/>
                </Grid>
                <Grid item xs={6}>
                    <GasSensorGauge/>
                </Grid>
                <Grid item xs = {12}>
                    <GasSensorGauge/>
                </Grid>
            </Grid>
        </div>
    )
}

export default SensorData;