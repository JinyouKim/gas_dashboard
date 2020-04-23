import React, {Component} from 'react';
import theme from './theme';
import { ThemeProvider } from '@material-ui/styles';
import {createBrowserHistory} from 'history';
import {Router} from 'react-router-dom'
import Routes from './Routes'
import './assets/scss/index.scss';
import 'react-perfect-scrollbar/dist/css/styles.css';
import DashboardAppBar from './views/Dashboard/components/DashboardAppBar'



const browserHistory = createBrowserHistory();

function App() {
  return (
    <ThemeProvider theme={theme}>         
      <Router history = {browserHistory}>
        <Routes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
