import React, { Component, } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import marker from 'image/marker.png';

import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,

} from '@material-ui/core';


const useStyles = theme => ({
    root: {
        height: '30.55vh'
    },
    content: {
        padding: 0
    },
    tableHeader: {
    },
    tableTitleCell: {

    }
});

class SensorInfoTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sensorId: "",
            sensorAddress: "",
            sensorType: "",
            sensorDate: "",
            sensorLongitude: "",
            sensorLatitude: "",
            sensorIsOn: "",
            isMounted: false
        };
    }
    componentWillMount() {
        this.forceUpdate();
        console.log(this.state);
    }
    componentWillReceiveProps(nextProps) {        
    }
    render() {
        console.log(this.props);
        const { className, classes, ...rest } = this.props;

        const sensorId = this.props.clickedSensorId;
        const sensorInfos = this.props.sensorInfos;
        let info = null;

        for(const i in sensorInfos) {
            info = sensorInfos[i];
            if(sensorId===info.sensor_id) {
              break;
            }
        }
        
        return (
            <Card
                {...rest}
                className={clsx(classes.root, className)}
            >
                <CardHeader
                title={<div><img src={marker} width = "6px" height ="10px"/> 센서 정보</div> }          
                />
                <Divider />
                <CardContent className={classes.content}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>센서 ID</TableCell>
                                <TableCell>{info.sensor_id}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>센서 주소</TableCell>
                                <TableCell>{info.address}</TableCell>
                            </TableRow>                            
                            <TableRow>
                                <TableCell>설치 날짜</TableCell>
                                <TableCell>{info.date_created}</TableCell>
                            </TableRow>                            
                        </TableBody>
                    </Table>
                    <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell style = {{width: 150}}>경도</TableCell>
                                        <TableCell>{info.longitude}</TableCell>
                                        <TableCell>위도</TableCell>
                                        <TableCell>{info.latitude}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                </CardContent>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        sensorInfos: state.sensor.sensorInfos,
        clickedSensorId: state.session.clickedSensorId
    };
}

export default connect(mapStateToProps)(withStyles(useStyles)(SensorInfoTable));