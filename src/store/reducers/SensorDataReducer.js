import {RECV_SENSORDATA} from "../actions/index"
import {RECV_CLICKEVT} from "../actions/index"

export default function (state =[], action) {
    switch (action.type) {
        case RECV_SENSORDATA:
            return {
                ...state,
                data: action.value
            };
        case RECV_CLICKEVT:
            return {
                ...state,
                feature: action.value
            };
        
        default:
            return state;
    }
}