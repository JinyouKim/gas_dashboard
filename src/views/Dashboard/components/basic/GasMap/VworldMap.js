import React, {Component, createRef} from 'react';
import OlLayerTile from 'ol/layer/Tile';
import Map from 'ol/Map';
import OlSourceXYZ from 'ol/source/XYZ';
import OlView from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import {clickMapOrBackward, clickSensorIcon} from 'store/actions'
import GeoJSON from 'ol/format/GeoJSON';
import VectorSource from 'ol/source/Vector';
import {Heatmap as HeatmapLayer} from 'ol/layer';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point'
import Overlay from 'ol/Overlay'
import {connect} from 'react-redux';
import {Stroke, Style, Icon} from 'ol/style';
import proj4 from 'proj4';
import {register} from 'ol/proj/proj4';
import {get as getProjection, transform} from 'ol/proj';

import {facilityIcon1, facilityIcon2, facilityIcon3, facilityIcon4, facilityIcon0} from './icon/공공기관'
import {buildingIcon1, buildingIcon2, buildingIcon3, buildingIcon4, buildingIcon0} from './icon/일반건물'
import {houseIcon1, houseIcon2, houseIcon3, houseIcon4, houseIcon0} from './icon/주거시설'
import {governerIcon1, governerIcon2, governerIcon3, governerIcon4, governerIcon0} from './icon/정압기시설'
import {schoolIcon1, schoolIcon2, schoolIcon3, schoolIcon4, schoolIcon0} from './icon/학교시설'
import errorIcon from './icon/error.png'

import ReactDOM from 'react-dom'


class VworldMap extends Component {
    constructor(props) {
        super(props);

        const API_KEY= "2964EF43-1F02-3FD2-85E9-FF2F851ABB67";
        const vworld_url = "http://api.vworld.kr/req/wmts/1.0.0/"+API_KEY+"/Base/{z}/{y}/{x}.png"
                
        this.appRef = createRef();
        this.state = {
            isLoading: true,
            isSensorInfoLoading: false,
            isPipeDataLoading: false,
            iconStyleMap: new Map(),
            isNewSensorData: this.props.isNewSensorData,
            isClickedSearchButton: this.props.isClickedSearchButton,
            errorIconStyle: new Style({
                image: new Icon({
                    anchor:[0,0],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    src: errorIcon,
                    scale: 0.1                 
                })
            }),
            center: [14399176.134109937, 4314547.545574056],
            zoom: 14,
        };
        this.olMap = new Map({
            target: null,
            layers: [
                new OlLayerTile({
                    source: new OlSourceXYZ({
                        url: vworld_url                        
                    })
                })
            ],
            view: new OlView ({
                center: this.state.center,
                zoom: this.state.zoom
            })
        });

        const scale = 0.05
        const anchor = [0.5,0.8];
        //const anchor = [0,0];

        const iconStyleMap = this.state.iconStyleMap;

        iconStyleMap.set('주거시설', new Map())
        iconStyleMap.set('공공기관', new Map())
        iconStyleMap.set('일반건물', new Map())
        iconStyleMap.set('정압기시설', new Map())
        iconStyleMap.set('학교시설', new Map())
        
        let iconMap = iconStyleMap.get('주거시설');
        iconMap.set(0, new Style({image: new Icon({anchor:anchor, anchorXUnits:'fraction', anchorYUnits:'fraction', src:houseIcon0, scale:scale})}));
        iconMap.set(1, new Style({image: new Icon({anchor:anchor, anchorXUnits:'fraction', anchorYUnits:'fraction', src:houseIcon1, scale:scale})}));
        iconMap.set(2, new Style({image: new Icon({anchor:anchor, anchorXUnits:'fraction', anchorYUnits:'fraction', src:houseIcon2, scale:scale})}));
        iconMap.set(3, new Style({image: new Icon({anchor:anchor, anchorXUnits:'fraction', anchorYUnits:'fraction', src:houseIcon3, scale:scale})}));
        iconMap.set(4, new Style({image: new Icon({anchor:anchor, anchorXUnits:'fraction', anchorYUnits:'fraction', src:houseIcon4, scale:scale})}));

        iconMap = iconStyleMap.get('공공기관');
        iconMap.set(0, new Style({image: new Icon({anchor:anchor, anchorXUnits:'fraction', anchorYUnits:'fraction', src:facilityIcon0, scale:scale})}));
        iconMap.set(1, new Style({image: new Icon({anchor:anchor, anchorXUnits:'fraction', anchorYUnits:'fraction', src:facilityIcon1, scale:scale})}));
        iconMap.set(2, new Style({image: new Icon({anchor:anchor, anchorXUnits:'fraction', anchorYUnits:'fraction', src:facilityIcon2, scale:scale})}));
        iconMap.set(3, new Style({image: new Icon({anchor:anchor, anchorXUnits:'fraction', anchorYUnits:'fraction', src:facilityIcon3, scale:scale})}));
        iconMap.set(4, new Style({image: new Icon({anchor:anchor, anchorXUnits:'fraction', anchorYUnits:'fraction', src:facilityIcon4, scale:scale})}));

        iconMap = iconStyleMap.get('일반건물');
        iconMap.set(0, new Style({image: new Icon({anchor:anchor, anchorXUnits:'fraction', anchorYUnits:'fraction', src:buildingIcon0, scale:scale})}));
        iconMap.set(1, new Style({image: new Icon({anchor:anchor, anchorXUnits:'fraction', anchorYUnits:'fraction', src:buildingIcon1, scale:scale})}));
        iconMap.set(2, new Style({image: new Icon({anchor:anchor, anchorXUnits:'fraction', anchorYUnits:'fraction', src:buildingIcon2, scale:scale})}));
        iconMap.set(3, new Style({image: new Icon({anchor:anchor, anchorXUnits:'fraction', anchorYUnits:'fraction', src:buildingIcon3, scale:scale})}));
        iconMap.set(4, new Style({image: new Icon({anchor:anchor, anchorXUnits:'fraction', anchorYUnits:'fraction', src:buildingIcon4, scale:scale})}));

        iconMap = iconStyleMap.get('학교시설');
        iconMap.set(0, new Style({image: new Icon({anchor:anchor, anchorXUnits:'fraction', anchorYUnits:'fraction', src:schoolIcon0, scale:scale})}));
        iconMap.set(1, new Style({image: new Icon({anchor:anchor, anchorXUnits:'fraction', anchorYUnits:'fraction', src:schoolIcon1, scale:scale})}));
        iconMap.set(2, new Style({image: new Icon({anchor:anchor, anchorXUnits:'fraction', anchorYUnits:'fraction', src:schoolIcon2, scale:scale})}));
        iconMap.set(3, new Style({image: new Icon({anchor:anchor, anchorXUnits:'fraction', anchorYUnits:'fraction', src:schoolIcon3, scale:scale})}));
        iconMap.set(4, new Style({image: new Icon({anchor:anchor, anchorXUnits:'fraction', anchorYUnits:'fraction', src:schoolIcon4, scale:scale})}));

        iconMap = iconStyleMap.get('정압기시설');
        iconMap.set(0, new Style({image: new Icon({anchor:anchor, anchorXUnits:'fraction', anchorYUnits:'fraction', src:governerIcon0, scale:scale})}));
        iconMap.set(1, new Style({image: new Icon({anchor:anchor, anchorXUnits:'fraction', anchorYUnits:'fraction', src:governerIcon1, scale:scale})}));
        iconMap.set(2, new Style({image: new Icon({anchor:anchor, anchorXUnits:'fraction', anchorYUnits:'fraction', src:governerIcon2, scale:scale})}));
        iconMap.set(3, new Style({image: new Icon({anchor:anchor, anchorXUnits:'fraction', anchorYUnits:'fraction', src:governerIcon3, scale:scale})}));
        iconMap.set(4, new Style({image: new Icon({anchor:anchor, anchorXUnits:'fraction', anchorYUnits:'fraction', src:governerIcon4, scale:scale})}));
        
    }

    componentDidMount() {
        this.setState({isLoading: false, });
        this.olMap.setTarget("map");
        this.olMap.on("moveend", () => {
            let center = this.olMap.getView().getCenter();
            let zoom = this.olMap.getView().getZoom();
            this.setState({center, zoom});
        })
        
        const element = ReactDOM.findDOMNode(this).querySelector('#popup');
        
        const popup = new Overlay({
            element: element,
            positioning: 'bottom-center',
            stopEvent: false,
            offset:[0, -50]
        });
        this.olMap.addOverlay(popup);

        this.olMap.on('click', (evt) => {
            const feature = evt.map.forEachFeatureAtPixel(evt.pixel,
                function(feature) {
                    return feature;
                });
            if (feature && feature.values_.sensor_id != undefined) {
                const coordinates = feature.getGeometry().getCoordinates();
                popup.setPosition(coordinates);                
                this.props.onClickSensor(feature.values_.sensor_id);
            }
            else {
                this.props.onClickBackwardOrMap();
            }
        });
    }
    shouldComponentUpdate(nextProps, nextState) {
        let center = this.olMap.getView().getCenter();
        let zoom = this.olMap.getView().getZoom();
        if (center == nextState.center && zoom == nextState.zoom) return false;
        return true;        
    }
    componentWillReceiveProps(nextProps) {        
        if (nextProps.pipeData.length != 0 && !this.state.isPipeDataLoading) {
            const styles = {
                'LineString': new Style({
                    stroke: new Stroke({
                        color: 'black',
                        width: 1.5
                    })
                    
                })
            }
            const styleFunction = function(feature) {
                return styles[feature.getGeometry().getType()]
            };

            proj4.defs('EPSG:5187', '+proj=tmerc +lat_0=38 +lon_0=129 +k=1 ' +
            '+x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs');
            register(proj4);
            const koreanProjection = getProjection('EPSG:5187')
            const geoJsonObject = {
                'type': 'FeatureCollection',
                'crs' : {
                    'type': 'name',
                    'properties' : {
                        'name': 'EPSG:5187'
                    }
                },
                'features': nextProps.pipeData
            }
            const vectorSource = new VectorSource({
                features: (new GeoJSON()).readFeatures(geoJsonObject, {dataProjection: koreanProjection, featureProjection: 'EPSG:3857'})
            });
            const vectorLayer = new VectorLayer({
                source: vectorSource,
                style: styleFunction
            });
            this.olMap.addLayer(vectorLayer);
            this.state.isPipeDataLoading = true;
        }

        // 수정 필요
        if (nextProps.sensorMap !== undefined && !this.state.isSensorInfoLoading) {
            let centerX = 0;
            let centerY = 0;
            const sensors = nextProps.sensorInfos;
            const iconFeatures = [];
            for (const i in sensors){
                const sensor = sensors[i];
                const longitude = Number(sensor['longitude']);
                const latitude = Number(sensor['latitude']);

                const iconFeature = new Feature({
                    geometry: new Point(transform([longitude,latitude], 'EPSG:4326', 'EPSG:3857')),
                    sensor_id: sensor['sensor_id'],
                    address: sensor['address'],
                    date_created: sensor['date_created'],
                    user_id: sensor['user_id']
                })                
                iconFeature.setStyle(this.state.errorIconStyle);
                iconFeatures.push(iconFeature);
                centerX = centerX + iconFeature.getGeometry().getCoordinates()[0];
                centerY = centerY + iconFeature.getGeometry().getCoordinates()[1];
            }

            this.setState({iconFeatures: iconFeatures,});
            const vectorSource = new VectorSource({
                features: iconFeatures,
            });           

            var vectorLayer = new VectorLayer({
                source: vectorSource
            });
            vectorLayer.setZIndex(99);
            this.olMap.addLayer(vectorLayer);

            centerX = centerX / sensors.length;
            centerY = centerY / sensors.length;

            this.setState({center: [centerX,centerY], });
            this.olMap.getView().setCenter([centerX,centerY]); 
                                

            this.setState({isSensorInfoLoading: true,});
        }

        // 상태에 따른 아이콘 변경
        if (this.state.isSensorInfoLoading && nextProps.sensorMap !== undefined && nextProps.facilityMap !== undefined && this.state.isNewSensorData != nextProps.isNewSensorData) {       
            const iconFeatures = this.state.iconFeatures;
            const iconStyleMap = this.state.iconStyleMap;
            const facilityMap = nextProps.facilityMap;
            const sensorMap = nextProps.sensorMap;
            
            let abnormalCount = 0;
            let vectorSource = new VectorSource();
            for (const i in iconFeatures) {                
                const iconFeature = iconFeatures[i];
                const sensorId = iconFeature.values_['sensor_id']
                const status = Number(sensorMap.get(sensorId).get('status'));
                const facilityId = sensorMap.get(sensorId).get('facility_id');
                const facilityName = facilityMap.get(facilityId).get("facility_name");
                if (status === -1)
                    iconFeature.setStyle(this.state.errorIconStyle); 
                else {
                    iconFeature.setStyle(iconStyleMap.get(facilityName).get(status));
                    if (status >= 1) {
                        let weight = 0;
                        switch(status) {
                            case 1: weight=10; break;
                            case 2: weight=20; break;
                            case 3: weight=30; break;
                            case 4: weight=40; break;                            
                        }
                        
                        abnormalCount = abnormalCount + 1;
                        vectorSource.addFeature(
                            new Feature({
                                geometry: iconFeature.getGeometry(),
                                weight: weight
                            })
                        )                 
                    }
                }
            }
            if (abnormalCount != 0) {
                if (this.state.heatMapLayer)
                    this.olMap.removeLayer(this.state.heatMapLayer)
                const heatMapLayer = new HeatmapLayer({
                    source: vectorSource,
                    radius: 60,
                    blur: 70
                });
                this.olMap.addLayer(heatMapLayer);
                this.setState({heatMapLayer: heatMapLayer})
            }
            else {
                if (this.state.heatMapLayer)
                    this.olMap.removeLayer(this.state.heatMapLayer)
            }
            this.setState({isNewSensorData: nextProps.isNewSensorData});
        }

        // '이동' 버튼 클릭시 맵 이동
        if (nextProps.sensorMap !== undefined && this.state.isClickedSearchButton !== nextProps.isClickedSearchButton) {
            const sensorMap = nextProps.sensorMap;
            
            const infoMap = sensorMap.get(nextProps.selectedSensorId);
            const longitude = infoMap.get('longitude');
            const latitude = infoMap.get('latitude');
            console.log(longitude, latitude);
            console.log(this.state.center)
            const centerPoint = new Point(transform([longitude,latitude], 'EPSG:4326', 'EPSG:3857'));
            const centerX = centerPoint.getCoordinates()[0]
            const centerY = centerPoint.getCoordinates()[1]            

            this.olMap.getView().setCenter([centerX,centerY]);
            this.olMap.getView().setZoom(18);
            this.setState({center: [centerX,centerY], isClickedSearchButton: nextProps.isClickedSearchButton});
                        
            
        }
    }

    render() {                  
        return (
            <div id ="map" style={{width:"100%", height: "100%"}}>
                <div id="popup"></div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        pipeData: state.pipe.pipeData,
        sensorInfos: state.sensor.sensorInfos,
        clickedSensorId: state.session.clickedSensorId,
        sensorData: state.sensor.sensorData,
        sensorMap: state.sensor.sensorMap,
        facilityMap: state.sensor.facilityMap,
        isNewSensorData: state.sensor.isNewSensorData,
        selectedSensorId: state.session.selectedSensorId,
        isClickedSearchButton: state.session.isClickedSearchButton,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {        
        onClickSensor: (sensorId) => {
            dispatch(clickSensorIcon(sensorId))
        },
        onClickBackwardOrMap:() => {
            dispatch(clickMapOrBackward())
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (VworldMap);