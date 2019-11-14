import React, {Component, createRef} from 'react';
import OlLayerTile from 'ol/layer/Tile';
import OlMap from 'ol/Map';
import OlSourceXYZ from 'ol/source/XYZ';
import OlView from 'ol/View';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';


class VworldMap extends Component {    
    
    constructor(props) {
        const API_KEY= "2964EF43-1F02-3FD2-85E9-FF2F851ABB67";
        const vworld_url = "http://api.vworld.kr/req/wmts/1.0.0/"+API_KEY+"/Base/{z}/{y}/{x}.png"
        
        super(props);
        this.appRef = createRef();
        this.state = {
            isLoading: true,
            center: [14398789.42, 4315822.05],
            zoom: 16,
        };
        this.olMap = new OlMap({
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
    }
    shouldComponentUpdate(nextProps, nextState) {
        let center = this.olMap.getView().getCenter();
        let zoom = this.olMap.getView().getZoom();
        if (center == nextState.center && zoom == nextState.zoom) return false;
        return true;
    }

    render() {                  
        return (
            <div id ="map" style={{width:"100%", height: 800}}>
            </div>
        );
    }
}

export default VworldMap;