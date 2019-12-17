import {combineReducers} from 'redux';
import SensorDataReducer from './SensorDataReducer.js'
import PipeDataReducer from './PipeDataReducer.js'
import SensorInfoReducer from './SensorInfoReducer.js'
import TotalSensorDataReducer from './TotalSensorDataReducer.js'
import VworldMapReducer from './VworldMapReducer';

const rootReducer = combineReducers({
    clickedFeature: VworldMapReducer,
    sensorData: SensorDataReducer,
    pipeData: PipeDataReducer,
    sensorInfo: SensorInfoReducer,
    totalSensorData: TotalSensorDataReducer
});

export default rootReducer;