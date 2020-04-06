import {RECV_ALLSENSORINFO, RECV_ALLSENSORDATA, RECV_LOGDATA,RECV_DISTRICTDANGER, RECV_TOTALSENSORSTATUS} from "../actions/index"

export default function (state ={sensorInfos: [], sensorData: [], logData: [], districtDanger: [], totalSensorStatus: []}, action) {
    switch (action.type) {
        case RECV_ALLSENSORINFO:
            return {
                ...state,
                sensorInfos: action.sensorInfos
            };
        case RECV_ALLSENSORDATA:
            return {
              ...state,
              sensorData: action.sensorData  
            };
        case RECV_LOGDATA:
            return {
                ...state,
                logData: action.logData
            }
        case RECV_DISTRICTDANGER:
            return {
                ...state,
                districtDanger: action.districtDanger
            }
        case RECV_TOTALSENSORSTATUS:
            return {
                ...state,
                totalSensorStatus: action.totalSensorStatus
            }
        default:
            return state;
    }
}