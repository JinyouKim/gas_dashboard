export const RECV_SENSORDATA = "RECV_SENSORDATA";
export const RECV_PIPEDATA = "RECV_PIPEDATA";
export const RECV_SENSORINFO = "RECV_SENSORINFO";
export const CLICK_MAP_OR_BACKWARD = "CLICK_MAP_OR_BACKWARD";
export const RECV_ALLSENSORDATA = "RECV_ALLSENSORDATA";
export const CLICK_SENSORICON = "CLICK_SENSORICON";
export const RECV_ALLSENSORINFO = "RECV_ALLSENSORINFO";
export const RECV_LOGDATA = "RECV_LOGDATA";
export const RECV_DISTRICTDANGER = "RECV_DISTRICTDANGER";
export const RECV_TOTALSENSORSTATUS = "RECV_TOTALSENSORSTATUS";
export const RECV_ALLFACILITYINFO = "RECV_ALLFACILITYINFO";
export const CLICK_SEARCHBUTTON = "CLICK_SEARCHBUTTON";


// 센서 아이콘 클릭
export function clickSensorIcon(sensorId) {
    return {
        type: CLICK_SENSORICON,
        clickedSensorId: sensorId
    };
}

// 맵 또는 뒤로가기 버튼 클릭
export function clickMapOrBackward() {
    return {
        type: CLICK_MAP_OR_BACKWARD
    };
}

// 파이프 정보 수신
export function receivePipeData(pipeData) {
    return {
        type: RECV_PIPEDATA,
        pipeData: pipeData
    };
}

// 센서 정보 수신 액션
export function receiveSensorInfo(value) {
    return {
        type: RECV_SENSORINFO,
        value: value
    }
}

// 전체 센서 데이터 수신
export function receiveAllSensorData(sensorData) {
    return {
        type: RECV_ALLSENSORDATA,
        sensorData: sensorData
    }
}

// 로그 데이터 수신
export function receiveLogData(logData) {
    return {
        type: RECV_LOGDATA,
        logData: logData
    }
}
// 지역 위험 정보 수신
export function receiveDistrictDanger(districtDanger) {    
    return {
        type: RECV_DISTRICTDANGER,
        districtDanger: districtDanger
    }
}

// 전체 센서 정보 수신
export function receiveAllSensorInfo(sensorInfos) {
    return {
        type: RECV_ALLSENSORINFO,
        sensorInfos: sensorInfos
    }
}

// 전체 센서 상태 수신
export function receiveTotalSensorStatus(totalSensorStatus) {
    return {
        type: RECV_TOTALSENSORSTATUS,
        totalSensorStatus: totalSensorStatus
    }
}
export function receiveAllFacilityInfo(allFacilityInfo) {
    return {
        type: RECV_ALLFACILITYINFO,
        allFacilityInfo: allFacilityInfo
    }
}

export function clickSearchButton(selectedSensorId) {
    return {
        type:CLICK_SEARCHBUTTON,
        selectedSensorId: selectedSensorId
    }    
}



