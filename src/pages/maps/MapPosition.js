import React, {Component} from 'react';
import {Map, LayerGroup, TileLayer} from 'react-leaflet';
import {Button, Icon, message} from "antd";
import MarkerClusterGroup from 'react-leaflet-markercluster';

import PopupMarker from "../../components/map/PopupMarker";
import {formatDate} from "../../util/utils";
import Control from "react-leaflet-control";
import {$getPoints} from "../../util/api";
import {connect} from "react-redux";

const initCenter = [27.902326, 112.920405];  // 初始中心坐标
const initZoom = 15;  // 初始放大级别

class MapPosition extends Component {
    componentDidMount() {
        //后台获取所有点数据
        $getPoints().then((data)=>{
            console.log(data);
            let {markers} = this.state;
            markers = data.points.map((item) => ({
                id: item.id,
                name: item.username,
                position: [item.latlng.latitude, item.latlng.longitude],
                description: item.description,
                time: item.time
            }));
            console.log(markers);
            this.setState({
                markers
            });
            message.success("信息获取成功")
        }).catch((err)=>{
            console.log(err);
            message.error("信息获取失败")
        });
    }

    state = {
        markers: [],
        switchZoom: false,
        hasLocation: false,  // 是否定位完成
        loading: false,      // 定位按钮是否加载
        center: initCenter,  // 初始中心坐标
        zoom: initZoom,  // 初始放大级别
        layer:   // 初始图层  天地图
            [<TileLayer
                url="http://t{s}.tianditu.com/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=174705aebfe31b79b3587279e211cb9a"
                subdomains={['0', '1', '2', '3', '4', '5', '6', '7']}
            />,<TileLayer
                url="http://t{s}.tianditu.com/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk=174705aebfe31b79b3587279e211cb9a"
                subdomains={['0', '1', '2', '3', '4', '5', '6', '7']}
            />]
    };

    // 获取位置信息
    getLocation = () => {
        this.setState({loading:true});
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.onSuccess,this.onError);
        }else{
            alert("您的浏览器不支持地理定位");
        }
    };

    //定位成功
    onSuccess = (position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let latLng = [latitude, longitude];
        let localPoint = {
            name: this.props.userName,
            description: '你的当前位置，暂无信息',
            time: this.getLocalTime(),
            position: latLng
        };
        let {markers} = this.state;
        markers.push(localPoint);
        this.setState({markers, loading: false, center: latLng});
        message.success("获取位置信息成功！");
    };

    //定位失败
    onError = (error) => {
        switch(error.code)  {
            case error.PERMISSION_DENIED:
                message.error("您拒绝对获取地理位置的请求");
                break;
            case error.POSITION_UNAVAILABLE:
                message.error("位置信息是不可用的");
                break;
            case error.TIMEOUT:
                message.error("请求您的地理位置超时");
                break;
            case error.UNKNOWN_ERROR:
                message.error("未知错误");
                break;
            default:
                message.error("未知错误");
        }
        this.setState({loading:false});
    };

    // 获取当前时间
    getLocalTime = () => {
        let date = new Date().getTime();
        return formatDate(date);
    };

    // 设置中心
    setView = () => {
        let {switchZoom} = this.state;
        let temp = [initCenter[0]+0.00001,initCenter[1]];
        if(switchZoom) {
            this.setState({center: initCenter, zoom: initZoom});
        }else {
            this.setState({center: temp, zoom: initZoom+1});
        }
        this.setState({switchZoom: !switchZoom});
    };

    // 渲染所有marker
    renderMarkers = markers => (
        markers.map((item,index) => (
            <PopupMarker
                key={item.id}
                index={index}
                id={item.id}
                name={item.name}
                description={item.description}
                time={item.time}
                position={item.position}
                changeDescription={this.changeDescription}
                deletePoint={this.deletePoint}
                changeLatlng={this.changeLatlng}
            />
        ))
    );

    // 删除坐标点后更新
    deletePoint = (index) => {
        let {markers} = this.state;
        // eslint-disable-next-line no-unused-expressions
        markers.splice(index,1);
        this.setState({markers});
    };

    // 修改描述内容
    changeDescription = (index, description, time) => {
        let {markers} = this.state;
        // eslint-disable-next-line no-unused-expressions
        markers[index].description = description;
        markers[index].time = time;
        this.setState({markers});
    };

    // 修改坐标点经纬度
    changeLatlng = (index, longitude, latitude) => {
        let {markers} = this.state;
        // eslint-disable-next-line no-unused-expressions
        markers[index].position = [latitude, longitude];
        this.setState({markers});
    };

    render() {
        let {markers, center, zoom, layer} = this.state;

        return (
            <div>
                <Map
                    className='map-div'
                    center={center}
                    zoom={zoom}
                    // onViewportChanged={(viewport)=>{this.setState({ viewport })}}
                    useFlyTo={true}
                    maxZoom={18}
                    minZoom={4}
                >
                    <Control position="topright" >
                        <Button onClick={this.getLocation} loading={this.state.loading}>
                            定 位<Icon type='home'/>
                        </Button>
                    </Control>
                    <Control position="topright" >
                        <Button onClick={this.setView}>
                            复 位<Icon type='smile'/>
                        </Button>
                    </Control>
                    <LayerGroup>
                        {layer}
                    </LayerGroup>
                    <MarkerClusterGroup showCoverageOnHover={true}>
                        {this.renderMarkers(markers)}
                    </MarkerClusterGroup>
                </Map>
            </div>
        );
    }
}

const mapStateTpProps = (state) => {
    return{
        userName: state.userName
    }
};

export default connect(mapStateTpProps)(MapPosition);