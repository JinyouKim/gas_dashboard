import {RECV_SENSORDATA} from "../actions/index"

export default function (state =[], action) {
    switch (action.type) {
        case RECV_SENSORDATA:
            return {
                ...state,
                data: action.value
            };
        default:
            return state;
    }
}