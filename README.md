# 我的webGIS前端内容

使用react脚手架创建的项目

- 前端UI框架 : antd
- 地图JavaScript库: leaflet（react-leaflet）
- 数据库：mysql（mysql支持空间数据存储）
- 数据交互：ajax异步获取json数据（再自己转换成geojson数据，leaflet支持geojson数据）

项目效果：[点击这里](http://tangjayce.cn)（首页放了一张分辨率很高的地图，首次加载可能比较慢）

### 使用：


    clone 该项目路径
    
使用`yarn install` 或者 `npm install` 下载项目所依赖的包

运行项目：

    yarn start
    
使用的是我部署在云服务器上的后端接口，后端项目地址：[点击这里](https://github.com/TangJayce/WebGIS-back)

使用自己的后端记得修改**package.json**文件最后面代理路径

    "proxy": "http://tangjayce.cn"

修改为：

    "proxy": "http://你的url"  例如： "proxy": "http://localhost:8080"

我的QQ：1198009679（欢迎大佬骚扰）