import {RECV_ALLSENSORINFO, RECV_ALLSENSORDATA, RECV_LOGDATA,RECV_DISTRICTDANGER, RECV_TOTALSENSORSTATUS, RECV_ALLFACILITYINFO} from "../actions/index"

export default function (state ={sensorMap: undefined, facilityMap: undefined, sensorInfos: [], sensorData: [], logData: [], districtDanger: [], totalSensorStatus: [], isNewSensorData: false}, action) {
    switch (action.type) {
        case RECV_ALLSENSORINFO:
            let sensorMap = new Map();   
            action.sensorInfos.map(sensor => {
                let infos= new Map();
                infos.set("latitude", sensor.latitude)
                infos.set("longitude", sensor.longitude)
                infos.set("address", sensor.address)
                infos.set("district", sensor.district)
                infos.set("sensor_name", sensor.sensor_name)
                infos.set("sensor_image", sensor.sensor_image)
                infos.set("deploy_date", sensor.date_created)
                infos.set("facility_id", sensor.facility_id)
                infos.set("user_id", sensor.user_id)
                infos.set("log", undefined)
                infos.set("risk_value", undefined)
                infos.set("leak_status", undefined)
                infos.set("status", undefined)
                infos.set("value", undefined)
                infos.set("data_date", undefined)
                sensorMap.set(sensor.sensor_id, infos)
            });
            return {
                ...state,
                sensorInfos: action.sensorInfos,
                sensorMap: sensorMap
            };
        case RECV_ALLSENSORDATA:
            if (state.facilityMap) {
                for (let [facilityId, infoMap] of state.facilityMap) {
                    infoMap.set("normal", 0)
                    infoMap.set("abnormal", 0);
                    infoMap.set("malfunction", 0);
                }
            }
            if (state.sensorMap) {
                action.sensorData.map(sensorData => {
                    const sensorInfo = state.sensorMap.get(sensorData["sensor_id"]);
                    sensorInfo.set("risk_value",sensorData["risk_value"]);
                    sensorInfo.set("leak_status",sensorData["leak_status"]);
                    sensorInfo.set("status",sensorData["status"]);
                    sensorInfo.set("value",sensorData["value"]);
                    sensorInfo.set("data_date",sensorData["date_created"]);

                    if (state.facilityMap) {                        
                        const infoMap = state.facilityMap.get(sensorInfo.get('facility_id'));
                        const status = Number(sensorInfo.get('status'));
                        if (status == -1) 
                            infoMap.set("malfunction", infoMap.get("malfunction")+1)
                        else if (status == 0) {
                            infoMap.set("normal", infoMap.get("normal")+1)
                        }
                        else 
                            infoMap.set("abnormal", infoMap.get("abnormal")+1)
                        
                    }

                })
            }

            return {
              ...state,
              sensorData: action.sensorData,
              facilityMap: state.facilityMap,
              isNewSensorData: !state.isNewSensorData
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
        case RECV_ALLFACILITYINFO:
            let facilityMap = new Map(); 
            action.allFacilityInfo.map(facility => {
                let infos= new Map();
                infos.set("facility_name", facility.facility_name);
                infos.set("normal", 0);
                infos.set("abnormal", 0);
                infos.set("malfunction", 0);
                facilityMap.set(facility.facility_id, infos);
            });
            return {
                ...state,
                facilityMap: facilityMap                
            }
        default:
            return state;
    }
}