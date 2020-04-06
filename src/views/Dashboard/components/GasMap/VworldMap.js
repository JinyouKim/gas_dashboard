import React, {Component, createRef} from 'react';
import OlLayerTile from 'ol/layer/Tile';
import Map from 'ol/Map';
import OlSourceXYZ from 'ol/source/XYZ';
import OlView from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import {clickMapOrBackward, clickSensorIcon} from '../../../../store/actions'
import GeoJSON from 'ol/format/GeoJSON';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point'
import Overlay from 'ol/Overlay'
import {connect} from 'react-redux';
import {Stroke, Style, Icon} from 'ol/style';
import proj4 from 'proj4';
import {register} from 'ol/proj/proj4';
import {get as getProjection, transform} from 'ol/proj';
import SensorIcon from './icon/sensor3.png'
import SensorIcon0 from './icon/정상.png'
import SensorIcon1 from './icon/관심.png'
import SensorIcon2 from './icon/주의.png'
import SensorIcon3 from './icon/경계.png'
import SensorIcon4 from './icon/위험.png'


import ReactDOM from 'react-dom'


class VworldMap extends Component {
    constructor(props) {
        const API_KEY= "2964EF43-1F02-3FD2-85E9-FF2F851ABB67";
        const vworld_url = "http://api.vworld.kr/req/wmts/1.0.0/"+API_KEY+"/Base/{z}/{y}/{x}.png"
        
        super(props);
        
        this.appRef = createRef();
        this.state = {
            isLoading: true,
            isSensorInfoLoading: false,
            isPipeDataLoading: false,
            iconStyle0: new Style({
                image: new Icon({
                    anchor:[0.5,46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    src: SensorIcon0,
                    scale: 0.08                 
                })
            }),
            iconStyle1: new Style({
                image: new Icon({
                    anchor:[0.5,46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    src: SensorIcon1,
                    scale: 0.08                 
                })
            }), 
            iconStyle2: new Style({
                image: new Icon({
                    anchor:[0.5,46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    src: SensorIcon2,
                    scale: 0.08                 
                })
            }), 
            iconStyle3: new Style({
                image: new Icon({
                    anchor:[0.5,46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    src: SensorIcon3,
                    scale: 0.08                 
                })
            }), 
            iconStyle4: new Style({
                image: new Icon({
                    anchor:[0.5,46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    src: SensorIcon4,
                    scale: 0.08                 
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
        if (nextProps.sensorInfos.length != 0 && !this.state.isSensorInfoLoading) {
            let centerX = 0;
            let centerY = 0;
            const sensors = nextProps.sensorInfos;
            const iconFeatures = [];
            /*
            const iconStyle = new Style({
                image: new Icon({
                    anchor:[0.5,46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    src: SensorIcon0,
                    scale: 0.08                 
                })
            });
            */
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
                iconFeature.setStyle(this.state.iconStyle0);
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
        if (this.state.isSensorInfoLoading && nextProps.sensorData.length != 0) {
            
       
           const iconFeatures = this.state.iconFeatures
           const sensorData = nextProps.sensorData;
           for (const i in iconFeatures) {
               const iconFeature = iconFeatures[i];
               const sensorId = iconFeature.values_['sensor_id']
               for (const j in sensorData) {
                    if(sensorData[j].sensor_id == sensorId) {
                        switch(Number(sensorData[j].status)) {
                            case 0:
                                iconFeature.setStyle(this.state.iconStyle0);
                                break;
                            case 1:
                                iconFeature.setStyle(this.state.iconStyle1);
                                break;
                            case 2:
                                iconFeature.setStyle(this.state.iconStyle2);
                                break;
                            case 3:
                                iconFeature.setStyle(this.state.iconStyle3);
                                break;
                            default:
                                iconFeature.setStyle(this.state.iconStyle4);
                                break;
                        }
                        break;
                    }
                

               }
           }
           console.log(sensorData);

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
        sensorData: state.sensor.sensorData
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