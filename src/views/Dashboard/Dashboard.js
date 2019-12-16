import React from 'react'
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';


import {
    SensorData,
    GasMap,
    LogTable,
    ContactInformation,
    TotalSensorData
} from './components'

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%",
        padding: '3vh'        
    }

}));

const Dashboard = (props) => {
    const classes = useStyles();
    let changingComponent;
    
    if (props.clickedFeature.value) {
        changingComponent = <SensorData/>
    }
    else {
        changingComponent = <TotalSensorData/>
    }

    return (
        <div className ={classes.root}>
            <Grid container spacing = {2} direction="row">
                <Grid item xs={9}> 
                    <GasMap/>
                </Grid>
                <Grid item xs = {3}>
                    {changingComponent}
                </Grid>
                <Grid item xs = {9}>
                    <LogTable/>
                </Grid>
                <Grid item xs = {3}>
                    <ContactInformation/>
                </Grid>
            </Grid>
        </div>
    )
}
const mapStateToProps = (state) => {
    console.log(state);
    return {
        clickedFeature: state.clickedFeature,
    };
}
export default connect(mapStateToProps)(Dashboard)