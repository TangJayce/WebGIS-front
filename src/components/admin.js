import React, {Component} from 'react';
import {Col, Row} from "antd";

import Header from "./Header";
import Footer from "./Footer";
import NavLeft from "./NavLeft";
import '../style/common.less'

class Admin extends Component {
    render() {
        return (
            <Row className='container'>
                <Col span={3} className='nav-left'>
                    <NavLeft/>
                </Col>
                <Col span={21} className='main'>
                    <Header/>
                    <Row className='content'>
                        {/*<Home/>*/}
                        {this.props.children}
                    </Row>
                    <Footer/>
                </Col>
            </Row>
        );
    }
}

export default Admin;