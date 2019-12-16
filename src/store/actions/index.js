export const RECV_SENSORDATA = "RECV_SENSORDATA";
export const RECV_PIPEDATA = "RECV_PIPEDATA";
export const RECV_SENSORINFO = "RECV_SENSORINFO";
export const RECV_CLICKEVT = "RECV_CLICKEVT";
export const RECV_TOTALSENSORDATA = "RECV_TOTALSENSORDATA";
export const RECV_BACKWARDEVENT = "RECV_BACKWARDEVENT";


export function receiveSensorData(value) {
    return {
        type: RECV_SENSORDATA,
        value: value
    };
}

export function receivePipeData(value) {
    return {
        type: RECV_PIPEDATA,
        value: value
    };
}

export function receiveSensorInfo(value) {
    return {
        type: RECV_SENSORINFO,
        value: value
    }
}

export function receiveTotalSensorData(value) {
    return {
        type: RECV_TOTALSENSORDATA,
        value: value
    }
}

export function receiveClickEvent(value) {
    return {
        type: RECV_CLICKEVT,
        value: value
    }
}
export function receiveBackwardEvent() {
    return {
        type: RECV_BACKWARDEVENT,
    }
}

