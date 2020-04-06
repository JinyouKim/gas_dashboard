import {CLICK_SENSORICON, CLICK_MAP_OR_BACKWARD} from "../actions/index"

export default function (state = {pageState: 0, clickedSensorId: "abc"}, action) {
    switch (action.type) {
        case CLICK_SENSORICON:     
            return {
                ...state,
                pageState: 1,
                clickedSensorId: action.clickedSensorId
            };
        case CLICK_MAP_OR_BACKWARD:            
            return {
                ...state,
                pageState: 0
            };
        default:
            return state;
    }
}