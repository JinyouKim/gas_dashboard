import React, {Component, createRef} from 'react';
import OlLayerTile from 'ol/layer/Tile';
import OlMap from 'ol/Map';
import Map from 'ol/Map';
import OlSourceXYZ from 'ol/source/XYZ';
import OlView from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import {receivePipeData, receiveSensorInfo, receiveBackwardEvent, receiveClickEvent} from '../../../../store/actions'
import GeoJSON from 'ol/format/GeoJSON';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point'
import Overlay from 'ol/Overlay'
import axios from 'axios';
import {connect} from 'react-redux';
import {Stroke, Style, Icon} from 'ol/style';
import proj4 from 'proj4';
import {register} from 'ol/proj/proj4';
import {get as getProjection, transform} from 'ol/proj';
import SensorIcon from './icon/sensor3.png'
import ReactDOM from 'react-dom'
import { Popover } from '@material-ui/core';


class VworldMap extends Component {
    constructor(props) {
        const API_KEY= "2964EF43-1F02-3FD2-85E9-FF2F851ABB67";
        const vworld_url = "http://api.vworld.kr/req/wmts/1.0.0/"+API_KEY+"/midnight/{z}/{y}/{x}.png"
        
        super(props);
        
        this.appRef = createRef();
        this.state = {
            isLoading: true,
            isSensorInfoLoading: false,
            isPipeDataLoading: false,
            center: [14399176.134109937, 4314547.545574056],
            zoom: 15,
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
    }

    componentDidMount() {
        this.setState({isLoading: false, });
        this.olMap.setTarget("map");
        this.olMap.on("moveend", () => {
            let center = this.olMap.getView().getCenter();
            let zoom = this.olMap.getView().getZoom();
            this.setState({center, zoom});
        })
        let getPipeData = () => {
            axios.get('http://141.223.108.164:8080/geojson').then(response =>{
                this.props.onReceivePipeData(response.data);            
            });
        }
        let getSensorInfo = () => {
            axios.get('http://141.223.108.164:8080/sensor_info').then(response =>{
                this.props.onReceiveSensorInfo(response.data);            
            });
        }
        
        getPipeData();
        getSensorInfo();  
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
            if (feature) {
                const coordinates = feature.getGeometry().getCoordinates();
                popup.setPosition(coordinates);
                this.props.onClickSensor(feature);                              
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
                        color: 'chartreuse',
                        width: 1
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
                'features': nextProps.pipeData.value
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
        if (nextProps.sensorInfo.value.length != 0 && !this.state.isSensorInfoLoading && this.state.isPipeDataLoading) {
            const sensors = nextProps.sensorInfo.value;
            const iconFeatures = [];
            const iconStyle = new Style({
                image: new Icon({
                    anchor:[0.5,46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    src: SensorIcon,
                    scale: 0.08                 
                })
            });
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
                iconFeature.setStyle(iconStyle);
                iconFeatures.push(iconFeature);
            }
            const vectorSource = new VectorSource({
                features: iconFeatures,
            });           

            var vectorLayer = new VectorLayer({
                source: vectorSource
            });
            this.olMap.addLayer(vectorLayer);

            this.state.isSensorInfoLoading = true;
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
        pipeData: state.pipeData,
        sensorInfo: state.sensorInfo
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onReceivePipeData: (value) => {
            dispatch(receivePipeData(value))
        },
        onReceiveSensorInfo: (value) =>{
            dispatch(receiveSensorInfo(value))
        },
        onClickSensor: (value) =>{
            dispatch(receiveClickEvent(value))
        },
        onClickBackwardOrMap: () => {
            dispatch(receiveBackwardEvent())
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (VworldMap);