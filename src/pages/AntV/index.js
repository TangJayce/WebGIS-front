import React, {Component} from 'react';

import '../maps/index.css'
import {Button, Card} from "antd";

class AntV extends Component {
    render() {
        return (
            <div>
                <Card title='基本图层'>
                    <Button>地图测试</Button>
                </Card>
            </div>
        );
    }
}

export default AntV;