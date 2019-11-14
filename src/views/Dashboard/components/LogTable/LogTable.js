import React, {useState} from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import uuid from 'uuid/v1'
import { StatusBullet } from '../../../../components';
import moment from 'moment';

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
import ArrowRightIcon from '@material-ui/icons/ArrowRight'

const testData = [
    {
    id: uuid(),
    info: 'sensor malfunction',
    createdAt: 1573719810550,
    status: 'urgent'
  },
  {
    id: uuid(),
    info: 'sensor data error',
    createdAt: 1572718820450,
    status: 'warning'
  },
  {
    id: uuid(),
    info: 'working well',
    createdAt: 1555016400000,
    status: 'normal'
  }
]
const statusColors = {
    normal: 'success',
    warning: 'info',
    urgent: 'danger'        
};
const useStyles = makeStyles(theme => ({
    root: {},
    content: {
      padding: 0
    },
    inner: {
      minWidth: 800
    },
    statusContainer: {
      display: 'flex',
      alignItems: 'center'
    },
    status: {
      marginRight: theme.spacing(1)
    },
    actions: {
      justifyContent: 'flex-end'
    }
  }));

const LogTable = props => {
    const {className, ...rest} = props;
    const classes = useStyles();

    const [logs] = useState(testData);
    console.log(moment().valueOf());

    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >
            <CardHeader
                title = "로그 메세지"
            >
            </CardHeader>
            <Divider />
            <CardContent className = {classes.content}>
                <PerfectScrollbar>
                    <div className = {classes.inner}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Sensor ID</TableCell>
                                    <TableCell>Date</TableCell>                         
                                    <TableCell>Time</TableCell>
                                    <TableCell>Sensor Information</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {logs.map(log => (
                                    <TableRow
                                        hover
                                        key={log.id}
                                    >
                                        <TableCell>{log.id}</TableCell>
                                        <TableCell>
                                            {moment(log.createdAt).format('YYYY-MM-DD')}
                                        </TableCell>
                                        <TableCell>
                                            {moment(log.createdAt).format('h:mm:ss a')}
                                        </TableCell>
                                        <TableCell>{log.info}</TableCell>
                                        
                                        <TableCell>
                                        <div className={classes.statusContainer}>
                                            <StatusBullet
                                            className={classes.status}
                                            color={statusColors[log.status]}
                                            size="sm"
                                            />
                                            {log.status}
                                        </div>
                                        </TableCell>
                                    </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </div> 
                </PerfectScrollbar>
            </CardContent>
            <Divider/>
            <CardActions className = {classes.actions}>
                <Button
                    color="Primary"
                    size="small"
                    variant="text"
                >
                    View All <ArrowRightIcon />
                </Button>
            </CardActions>
            
        </Card>

    );

}

export default LogTable;