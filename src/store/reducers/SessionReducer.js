import {CLICK_SENSORICON, CLICK_MAP_OR_BACKWARD, CLICK_SEARCHBUTTON} from "../actions/index"

export default function (state = {pageState: 0, clickedSensorId: "abc", selectedSensorId: undefined, isClickedSearchButton: false}, action) {
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
        case CLICK_SEARCHBUTTON:
            return {
                ...state,
                selectedSensorId: action.selectedSensorId,
                isClickedSearchButton: !state.isClickedSearchButton
            };
        default:
            return state;
    }
}