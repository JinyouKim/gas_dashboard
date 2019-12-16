import {RECV_PIPEDATA} from "../actions/index"

export default function (state =[], action) {
    switch (action.type) {
        case RECV_PIPEDATA:
            console.log("234");
            return {
                ...state,
                value: action.value
            };
        default:
            return state;
    }
}