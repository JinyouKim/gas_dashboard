import React, { Component, } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';

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
        height: '32vh'
    },
    content: {
        padding: 0
    },
    tableHeader: {
    },
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
        console.log(nextProps);
        if (this.state.sensorId !== nextProps.clickedSensorId) {
            this.setState({ sensorId: nextProps.clickedSensorId });

        }
        if (nextProps.sensorInfo) {
            console.log(nextProps.sensorInfo);
            for (const i in nextProps.sensorInfo) {
                const sensor = nextProps.sensorInfo[i]
                console.log(sensor);
                console.log(this.state.sensorId);
                if (this.state.sensorId === sensor.sensor_id) {
                    this.setState({
                        sensorAddress: sensor.address,
                        sensorType: '가스센서',
                        sensorDate: sensor.date_created,
                        sensorLongitude: sensor.longitude,
                        sensorLatitude: sensor.latitude,
                        sensorIsOn: "작동중"
                    });
                    break;
                }

            }
        }
    }
    render() {
        console.log(this.props);
        const { className, classes, ...rest } = this.props;
        return (
            <Card
                {...rest}
                className={clsx(classes.root, className)}
            >
                <CardHeader
                    title="센서 정보"
                >
                </CardHeader>
                <Divider />
                <CardContent className={classes.content}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>센서 ID</TableCell>
                                <TableCell>{this.props.info.sensorId}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>센서 주소</TableCell>
                                <TableCell>{this.props.info.sensorAddress}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>센서 종류</TableCell>
                                <TableCell>{this.props.info.sensorType}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>설치 날짜</TableCell>
                                <TableCell>{this.props.info.sensorDate}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>작동 유무</TableCell>
                                <TableCell>{this.props.info.sensorIsOn}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>경도</TableCell>
                                <TableCell>{this.props.info.sensorLongitude}</TableCell>
                                <TableCell>위도</TableCell>
                                <TableCell>{this.props.info.sensorLatitude}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
                <Divider />
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    let sensorInfo = state.sensorInfo.value;
    let clickedSensorId = state.clickedFeature.feature.values_.sensor_id;
    let info = {};

    if (sensorInfo && clickedSensorId) {
        for (const i in sensorInfo) {
            const sensor = sensorInfo[i]
            console.log(sensor.sensor_id);
            if (clickedSensorId === sensor.sensor_id) {                
                info =
                    {   
                        sensorId: sensor.sensor_id,
                        sensorAddress: sensor.address,
                        sensorType: '가스센서',
                        sensorDate: sensor.date_created,
                        sensorLongitude: sensor.longitude,
                        sensorLatitude: sensor.latitude,
                        sensorIsOn: "작동중"
                    };
                break;
            }
        }

    }
    return {
        info: info,
    };
}

export default connect(mapStateToProps)(withStyles(useStyles)(SensorInfoTable));