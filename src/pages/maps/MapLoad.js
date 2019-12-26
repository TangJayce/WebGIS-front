import React, {Component} from 'react';
import {LayerGroup, Map, TileLayer} from "react-leaflet";
import Control from "react-leaflet-control";
import {message, Select} from "antd";
import {$getLayerByName, $getLayersName} from "../../util/api";
import {GeoJSONFillable, Patterns} from "react-leaflet-geojson-patterns";

class MapLoad extends Component {
    state = {
        bounds: [[39.5,116],[40.5,117]],
        layers: [
            {title: '选择图层', table_name: 'county', loading: false, names: []},
            {title: '选择铁路', table_name: 'railway', loading: false, names: []},
            {title: '选择道路', table_name: 'road', loading: false, names: []}
        ],
        BaseLayer:   // 初始图层  天地图
            [<TileLayer
                url="http://t{s}.tianditu.com/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=174705aebfe31b79b3587279e211cb9a"
                subdomains={['0', '1', '2', '3', '4', '5', '6', '7']}
            />]
    };

    // 渲染地图控件
    renderControls = () => {
        let {layers} = this.state;
        console.log(layers);
        return layers.map((item,LayerIndex) => (
            <Control position="topright">
                <Select
                    defaultValue={item.title}
                    style={{width: 120}}
                    onChange={(index) => {
                        this.changeLayer(LayerIndex, index)
                    }}
                    loading={item.loading}
                    onDropdownVisibleChange={(dropdown) => {
                        this.loadLayersName(dropdown, LayerIndex)
                    }}
                >
                    {this.renderLayerMenu(item)}
                </Select>
            </Control>
        ))
    };

    // 加载图层名称
    loadLayersName = (dropdown, LayerIndex) => {
        let {layers} = this.state;
        if(dropdown) {
            layers[LayerIndex].loading = true;
            this.setState({layers});
            $getLayersName(layers[LayerIndex].table_name).then((data)=>{
                if(data.names !== layers[LayerIndex].names) {
                    console.log(data);
                    layers[LayerIndex].names = data.names;
                    this.setState({layers})
                }
            }).catch((err)=>{
                console.log(err);
                message.error('获取图层名称失败')
            }).finally(()=>{
                layers[LayerIndex].loading = false;
                this.setState({layers})
            })
        }
    };

    // 渲染下拉菜单
    renderLayerMenu = (LayerItem) => {
        const {Option} = Select;
        return LayerItem.names.map((item,index)=>{
            return <Option key={index} value={index}>{item}</Option>
        });
    };

    // 选择不同的图层时加载数据
    changeLayer = (LayerIndex, index)=>{
        this.setState({geojson: null});
        const {layers} = this.state;
        $getLayerByName(layers[LayerIndex].names[index],layers[LayerIndex].table_name).then((data) => {
            console.log(data);
            message.success('获取信息成功');
            this.setState({
                geojson: data.json,
                bounds:[
                    [data.map_MBR[0].latitude,data.map_MBR[0].longitude],
                    [data.map_MBR[2].latitude,data.map_MBR[2].longitude]
                ],
            });
        }).catch((err) => {
            console.log(err);
            message.error('获取信息失败')
        }).finally(() => {
            this.setState({loading: false})
        });
    };

    render() {
        let {bounds, BaseLayer, geojson} = this.state;
        let geoLayer = geojson?<GeoJSONFillable
            data={geojson}
            style={feature => ({
                color: "red",
                fillPattern: Patterns.StripePattern({
                    key: "StripePattern",
                    color: 'white'
                })
            })}
        />:null;

        return (
            <div>
                <Map
                    className='map-div'
                    bounds={bounds}
                    useFlyTo={true}
                    maxZoom={18}
                    minZoom={4}
                >
                    {this.renderControls()}
                    <LayerGroup>
                        {BaseLayer}
                    </LayerGroup>
                    {geoLayer}
                </Map>
            </div>
        );
    }
}

export default MapLoad;