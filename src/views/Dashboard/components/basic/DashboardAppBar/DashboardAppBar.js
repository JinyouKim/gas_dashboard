import React, { Component } from 'react';
import clsx from 'clsx';
import {withStyles} from '@material-ui/core/styles';
import platformLogo from 'image/platform_logo.png';
import skLogo from 'image/sk_logo.jpg';
import {
    AppBar,
    Toolbar,
    Link,
    Paper,
    Card,
    CardContent
 } from '@material-ui/core';

const useStyles = theme => ({ 
    root :{
        height: '5vh'
    },
    appbar : {
        position: "sticky",
        backgroundColor: '#2A2F3D',
    },
    toolbar: {
        justifyContent: 'space-between',
        minHeight: '100%',
        height: '100%',
        width: '100%',
    },
    title: {
        fontSize: 32,
    },
    left: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-start',
        height: '100%',
        textAlign: 'center',
    },
    right: {
        flex: 1,
        display : 'flex',
        height: '100%',
        justifyContent: 'flex-end'
    },
    logo: {
        height: '100%'        
    },
});


class DashboardAppBar extends Component {
    render() {
        const {className, classes, ...rest} = this.props;
        return (
            <Paper className ={clsx(classes.root, className)}>
                <Toolbar className = {classes.toolbar}>
                    <div className = {classes.left}>
                        <img src={platformLogo} className ={classes.logo}></img>
                    </div>
                    <Link
                        variant = 'h3'
                        className = {classes.title}
                        color = 'inherit'
                        underline = "none"
                        href = "/dashboard"
                    >
                        {'포항시 가스 위험 상황판'}
                    </Link>
                    <div className = {classes.right}>
                        <img src={skLogo} className ={classes.logo}></img>
                    </div>

                </Toolbar>
            </Paper>
        );
    }
}

export default withStyles(useStyles)(DashboardAppBar)