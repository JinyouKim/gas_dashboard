import React from 'react'
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'


import {
    GasSensorGauge,
    GasMap,
    LogTable,
    ContactInformation
} from './components'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)        
    }

}));

const Dashboard = () => {
    const classes = useStyles();

    return (
        <div className ={classes.root}>
            <Grid container spacing = {2} direction="row">
                <Grid item xs={10}>
                    <GasMap/>
                </Grid>
                <Grid item xs = {2}>
                    <GasSensorGauge/>
                </Grid>
                <Grid item xs = {10}>
                    <LogTable/>
                </Grid>
                <Grid item xs = {2}>
                    <ContactInformation/>
                </Grid>
            </Grid>
        </div>
    )
}

export default Dashboard;