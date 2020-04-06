import {RECV_CLICKEVT, RECV_BACKWARDEVT, RECV_ALLSENSORINFO} from "../actions/index"

export default function (state =[], action) {
    switch (action.type) {
        case RECV_CLICKEVT:
            return {
                ...state,
                value: action.value
            };
        case RECV_BACKWARDEVT:
            return {
                ...state,
                value: action.value
            };
        
        case RECV_ALLSENSORINFO:
            return {
                ...state,
                sensorInfos: action.sensorInfos                
            }
        
        default:
            return state;
    }
}