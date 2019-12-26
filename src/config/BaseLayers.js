/**
 * 各种瓦片地图的路径信息
 */
export default [
    {
        title: '天地图',
        MapInfo: [{
            url: 'http://t{s}.tianditu.com/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=174705aebfe31b79b3587279e211cb9a',
            subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
        },{
            url: 'http://t{s}.tianditu.com/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk=174705aebfe31b79b3587279e211cb9a',
            subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
        }]
    },
    {
        title: '天地图影像',
        MapInfo: [{
            url: 'http://t{s}.tianditu.com/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=174705aebfe31b79b3587279e211cb9a',
            subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
        },{
            url: 'http://t{s}.tianditu.com/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk=174705aebfe31b79b3587279e211cb9a',
            subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
        }]
    },
    {
        title: '高德地图',
        MapInfo: [{
            url: 'http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
            subdomains: ["1", "2", "3", "4"]
        }]
    },
    {
        title: '高德影像',
        MapInfo: [{
            url: 'http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
            subdomains: ["1", "2", "3", "4"]
        },{
            url: 'http://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}',
            subdomains: ["1", "2", "3", "4"]
        }]
    },
    {
        title: '谷歌地图',
        MapInfo: [{
            url: 'http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}',
            subdomains: []
        }]
    },
    {
        title: '谷歌影像',
        MapInfo:[{
            url: 'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',
            subdomains: []
        }]
    },
    {
        title: '智图地图',
        MapInfo:[{
            url: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}',
            subdomains: []
        }]
    }
]