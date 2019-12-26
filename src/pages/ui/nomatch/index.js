import React, {Component} from 'react';
import {Card, Empty} from "antd";
// import './index.css'

class NoMatch extends Component {
    render() {
        return (
            <div className='not-found'>
                <Card>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </Card>
            </div>
        );
    }
}

export default NoMatch;