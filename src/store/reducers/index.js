import {combineReducers} from 'redux';
import SensorDataReducer from './SensorDataReducer.js'
import PipeDataReducer from './PipeDataReducer.js'
import SensorInfoReducer from './SensorInfoReducer.js'
import TotalSensorDataReducer from './TotalSensorDataReducer.js'
import DashboardReducer from './DashboardReducer.js';

const rootReducer = combineReducers({
    sensorData: SensorDataReducer,
    pipeData: PipeDataReducer,
    sensorInfo: SensorInfoReducer,
    totalSensorData: TotalSensorDataReducer,
    clickedFeature: DashboardReducer
});

export default rootReducer;