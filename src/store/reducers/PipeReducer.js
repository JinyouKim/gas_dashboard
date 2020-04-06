import {RECV_PIPEDATA} from "../actions/index"

export default function (state ={pipeData: []}, action) {
    switch (action.type) {
        case RECV_PIPEDATA:
            return {
                ...state,
                pipeData: action.pipeData
            };
        default:
            return state;
    }
}