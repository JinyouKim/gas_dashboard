import {RECV_CLICKEVT, RECV_BACKWARDEVT} from "../actions/index"

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
        
        default:
            return state;
    }
}