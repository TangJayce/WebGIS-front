import React, {Component} from 'react';
import {Button, Icon, Select} from "antd";
import {LayerGroup, Map, TileLayer} from "react-leaflet";
import BaseLayers from "../../config/BaseLayers";
import Control from "react-leaflet-control";

class MapLayers extends Component {
    state = {
        center: [27.902326, 112.920405],  // 初始中心坐标
        layer:   // 初始图层  天地图
            [<TileLayer
                url="http://t{s}.tianditu.com/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=174705aebfe31b79b3587279e211cb9a"
                subdomains={['0', '1', '2', '3', '4', '5', '6', '7']}
            />,<TileLayer
                url="http://t{s}.tianditu.com/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk=174705aebfe31b79b3587279e211cb9a"
                subdomains={['0', '1', '2', '3', '4', '5', '6', '7']}
            />]
    };

    // 改变图层
    changeLayer = (index) => {
        // console.log(index);
        let layer = BaseLayers[index].MapInfo.map((item)=>(
            <TileLayer
                url={item.url}
                subdomains={item.subdomains}
            />
        ));
        this.setState({layer})
    };

    // 渲染图层选择下拉菜单
    renderMapMenu = () => {
        const {Option} = Select;
        return BaseLayers.map((item,index)=>(
            <Option key={index} value={index}>{item.title}</Option>
        ))
    };

    render() {
        let {center, layer} = this.state;

        return (
            <div>
                <Map
                    className='map-div'
                    center={center}
                    zoom={15}
                    useFlyTo={true}
                    maxZoom={18}
                    minZoom={4}
                >
                    <Control position="topright" >
                        <Select defaultActiveFirstOption={true} defaultValue='天地图' style={{width: 120}} onChange={this.changeLayer}>
                            {this.renderMapMenu()}
                        </Select>
                    </Control>
                    <LayerGroup>
                        {layer}
                    </LayerGroup>
                </Map>
            </div>
        );
    }
}

export default MapLayers;