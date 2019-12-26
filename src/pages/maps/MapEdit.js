import React, {Component} from 'react';
import {Button, Icon, message} from "antd";
import {FeatureGroup, LayerGroup, Map, Marker, TileLayer, Circle} from "react-leaflet";
import {EditControl} from "react-leaflet-draw";
import { GeoJSONFillable, Patterns} from 'react-leaflet-geojson-patterns';
import Control from 'react-leaflet-control';

import {$getGeoJSONByName} from "../../util/api";

const initViewPort = {
    center: [34.45244364675112, 116.40424732104404],  // 初始中心坐标
    zoom: 10      // 初始放大级别
};

class MapEdit extends Component {
    state = {
        loading: false,      // 定位按钮是否加载
        viewport: initViewPort
    };

    componentWillMount() {
        // this.leafletElement = MyControl;

        // this.setState({geojson});
        $getGeoJSONByName('砀山县').then((data)=>{
            message.success(data.msg);
            console.log(data);
            this.setState({geojson: data.json});
        }).catch((err)=>{
            message.error('加载数据失败');
            console.log(err);
        })
    }

    handleClick = (e) => {
        console.log(e);
    };

    render() {
        let {viewport, loading, geojson} = this.state;
        let bounds = [
            [39.5, 115.5],
            [41.05, 117.5]
        ];
        let geoLayer = geojson?<GeoJSONFillable
            data={geojson}
            style={feature => ({
                color: "red",
                fillPattern: Patterns.CheckerBoardPattern({
                    key: "CheckerBoardPattern"
                })
            })}
        />:null;

        return (
            <div>
                <Map
                    className='map-div'
                    // bounds={bounds}
                    viewport={viewport}
                    onViewportChanged={(viewport)=>{this.setState({ viewport })}}
                    useFlyTo={true}
                    maxZoom={18}
                    minZoom={2}
                    onClick={this.handleClick}
                    zoomControl={false}
                >
                    <LayerGroup>
                        <TileLayer
                            url="http://t{s}.tianditu.com/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=174705aebfe31b79b3587279e211cb9a"
                            subdomains={['0', '1', '2', '3', '4', '5', '6', '7']}
                        />
                        <TileLayer
                            url="http://t{s}.tianditu.com/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk=174705aebfe31b79b3587279e211cb9a"
                            subdomains={['0', '1', '2', '3', '4', '5', '6', '7']}
                        />
                    </LayerGroup>
                    <FeatureGroup>
                        <EditControl
                            position='topleft'
                        />
                        <Control position="topleft" >
                            <Button size='small'>
                                <Icon type='user'/>
                            </Button>
                        </Control>
                        <Circle center={bounds[0]} radius={20000} />
                    </FeatureGroup>
                    {geoLayer}
                </Map>
            </div>
        );
    }
}

export default MapEdit;