import React from 'react'
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';


import {
    SensorData,
    RiskGraph
} from './components'

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%",
        padding: '0vh'        
    }

}));


const TotalSensorData = () => {
    const classes = useStyles();

    return (
        <div className ={classes.root}>
            <Grid container spacing = {2} direction="row">
                <Grid item xs={12}>
                    <SensorData/>
                </Grid>
                <Grid item xs = {12}>                    
                    <RiskGraph/>
                </Grid>
            </Grid>
        </div>
    )
}

export default TotalSensorData;