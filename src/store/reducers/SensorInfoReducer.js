import {RECV_SENSORINFO} from "../actions/index"

export default function (state =[], action) {
    switch (action.type) {
        case RECV_SENSORINFO:
            return {
                ...state,
                value: action.value
            };
        default:
            return state;
    }
}