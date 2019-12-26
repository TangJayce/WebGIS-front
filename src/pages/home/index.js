import React, {Component} from 'react';

import './index.less'

class Home extends Component {
    render() {
        return (
            <div className='home-wrap'>
                <ul>
                    <li>使用的技术 : 前后端分离</li>
                    <ul>
                        <li>前端主要技术 : React</li>
                        <li>前端UI框架 : antd(蚂蚁金服官方框架)</li>
                        <li>地图JavaScript库: leaflet</li>
                        <li>前后端数据传输 : ajax，使用axios库</li>
                        <li>后端 : JavaWeb项目，没有使用任何框架</li>
                        <li>数据库 : mysql</li>
                        <li>数据库连接池 : druid(阿里巴巴官方)</li>
                        <li>项目部署 : github(静态页面) 云服务器(后端接口)</li>
                    </ul>
                </ul>
                <ul>
                    <li>已经完善的功能 :</li>
                    <ul>
                        <li>UI 全部</li>
                        <li>表单 全部</li>
                        <li>登录注册界面</li>
                        <li>登录后端</li>
                        <li>地图定位以及插入数据</li>
                        <li>多源地图</li>
                        <li>从数据库读取空间数据</li>
                    </ul>
                </ul>
                <ul>
                    <li>待完善的功能 :</li>
                    <ul>
                        <li>注册的后端</li>
                        <li>图片数据的存储</li>
                        <li>移动坐标点并保存至数据库</li>
                        <li>编辑图层并保存至数据库</li>
                        <li>AntV地图测试存在问题，正在施工</li>
                    </ul>
                </ul>
            </div>
        );
    }
}

export default Home;