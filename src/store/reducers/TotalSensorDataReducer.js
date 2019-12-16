import {RECV_TOTALSENSORDATA} from "../actions/index"

export default function (state =[], action) {
    switch (action.type) {        
        case RECV_TOTALSENSORDATA:
            console.log(action.value);
            return {
                ...state,
                value: action.value
            };   
        
        default:
            return state;
    }
}