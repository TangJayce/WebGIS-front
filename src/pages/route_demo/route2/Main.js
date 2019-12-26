import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Button} from "antd";

class Main extends Component {
    render() {
        return (
            <div>
                this is Main<br/>
                <Button><Link to='/home/info1'>信息详情</Link></Button>
                <Button><Link to='/home/info2'>信息详情</Link></Button>
                <hr/>
                {this.props.children}
            </div>
        );
    }
}

export default Main;