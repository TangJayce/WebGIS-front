import React, {Component} from 'react';
import {Col, Row} from "antd";

import {formatDate} from './../../util/utils'
import Axios from "../../axios";
import './index.less'
import {connect} from "react-redux";

class Header extends Component {
    state = {
        systemTime: ''
    };

    componentWillMount() {
        setInterval(()=>{
            let systemTime = formatDate(new Date().getTime());
            this.setState({systemTime})
        },1000)
    }

    //TODO 跨域获取天气信息
    getWeatherAPIData(){
        Axios.jsonp({
            url: ''
        }).then((res)=>{
            console.log(res);
        })
    }

    handleDrop = () => {
        window.open('/#/login','_self');
    };

    render() {
        return (
            <div className='header'>
                <Row className='header-top'>
                    <Col span={24}>
                        <span>欢迎，{this.props.userName}</span>
                        <a onClick={this.handleDrop}>退出</a>
                    </Col>
                </Row>
                <Row className='breadcrumb'>
                    <Col span={4} className='breadcrumb-title'>
                        <h2>{this.props.menuName}</h2>
                    </Col>
                    <Col span={20} className='tip'>
                        <span className='date'>{this.state.systemTime}</span>
                        <span className='weather'>晴转多云</span>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateTpProps = (state) => {
    return{
        menuName: state.menuName,
        userName: state.userName
    }
};

export default connect(mapStateTpProps)(Header);