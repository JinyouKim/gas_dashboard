import {combineReducers} from 'redux';
import SessionReducer from './SessionReducer.js'
import SensorReducer from './SensorReducer.js'
import PipeReducer from './PipeReducer.js'

const rootReducer = combineReducers({
    session: SessionReducer,
    sensor: SensorReducer,
    pipe: PipeReducer,    
});

export default rootReducer;