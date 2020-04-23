import React, {useState, Component} from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import uuid from 'uuid/v1'
import { StatusBullet } from '../../../../components';
import moment from 'moment';
import { connect } from 'react-redux';
import marker from 'image/marker.png'

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
    TablePagination,
    TableContainer

} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import { callbackify } from 'util';
import { separateMessageFromStack } from 'jest-message-util';

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
    0: 'success',
    1: 'primary',
    2: 'warning',
    3: 'danger',
    4: 'info'      
};

const useStyles = theme => ({    
    root: {
      height: '100%'
    },
    content: {
      padding: 0,
      height: '27.09vh'
    },
    container: {
        height: '90%'        
    },
    table: {
        height: '100%'
    },
    pagination:{
      height: '100%'  
    },
    stickyHeader: {
        height: '100%',
        backgroundColor: '#171924'
    },
    inner: {
      minWidth: 800,
      maxHeight: '20vh'
    },
    statusContainer: {
      display: 'flex',
      alignItems: 'center'
    },
    status: {
      marginRight: theme.spacing(1)
    },
    actions: {
      height: '20%',
      justifyContent: 'flex-end'
    },
    headerCell: {
        /*color: '#8791ad',
        fontWeight: 'bold',
        fontSize: '12px',
        lineHeight: '15px',
        padding: '14px'*/
    }
  });


class LogTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logData: [],
            page: 0,
            rowsPerPage: 10,
        }
    }
    
    render() {
        const handleChangePage = (event, newPage) => {         
            this.setState({page: newPage,});
            console.log(this.state.page);
        }
        const handleChangeRowsPerPage = event => {
            this.setState({rowsPerPage: +event.target.value,});
            this.state.page = 0;
        }
        const {className, classes, ...rest} = this.props;
        const columns = [
            {id: 'sensor_id', label: '센서 이름', minWidth: 100},
            {id: 'risk_value', label: '로그 값', minWidth: 170},
            {id: 'date_created', label: '로그 시간', minWidth: 170},
            {id: 'status', label: '상태', minWidth: 100},
        ]
        return (
            <Card
            {...rest}
            className={clsx(classes.root, className)}
            >
            <CardHeader
                title={<div><img src={marker} width = "6px" height ="10px"/> 로그 메세지</div> }          
            />
            <Divider />            
            <CardContent className = {classes.content}>                
                <TableContainer className ={classes.container}>  
                    <Table stickyHeader className = {classes.table}>
                        <TableHead>
                            <TableRow>
                                {columns.map(column => (
                                    <TableCell key = {column.id} align={column.align} style ={{minWidth: column.minWidth, height: '45px'}} className = {classes.headerCell}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.logData.slice(this.state.page * this.state.rowsPerPage , this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(row => {
                                return(
                                    <TableRow hover tabIndex = {-1}>
                                        {columns.map(column => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.id==="status"
                                                        ? <div className={classes.statusContainer}>
                                                            <StatusBullet className={classes.status} color={statusColors[value]} size ="sm"/>
                                                            {value == '0' ? '정상': value == '1' ? '관심': value == '2' ? '주의' : value == '3' ? '경계': '위험'}
                                                          </div>
                                                        :value}
                                                </TableCell>
                                            )
                                        })} 
                                    </TableRow>

                                )
                            })
                            }
                        </TableBody>
                    </Table>
                    
                </TableContainer>
                
                <TablePagination
                 rowsPerPageOptions={[10, 25, 50]}
                 component = "div"
                 count={this.props.logData.length}
                 page={this.state.page}
                 rowsPerPage={this.state.rowsPerPage}
                 onChangePage = {handleChangePage}
                 onChangeRowsPerPage ={handleChangeRowsPerPage}
                 className ={classes.pagination}>
                </TablePagination>
                
                
            </CardContent>            
        </Card>


        )
    }
}

const mapStateToProps = (state) => {
    return {
      logData: state.sensor.logData,
    };
}

  

export default connect(mapStateToProps)(withStyles(useStyles)(LogTable));