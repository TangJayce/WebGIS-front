import React, {Component} from 'react';
import {Alert, Card, Spin, Switch} from "antd";

class Spins extends Component {
    state = {
        loading: false
    };

    toggle = value => {
        this.setState({ loading: value });
    };

    render() {
        return (
            <div>
                <Card title='基本用法'>
                    <Spin/>
                </Card>
                <Card title='各种大小'>
                    <Spin size="small" />
                    <Spin />
                    <Spin size="large" />
                </Card>
                <Card title='点击加载'>
                    <Spin spinning={this.state.loading} tip='加载中...'>
                        <Alert
                            message="Alert message title"
                            description="Further details about the context of this alert."
                            type="info"
                        />
                    </Spin>
                    <div style={{ marginTop: 16 }}>
                        点击切换加载状态 :
                        <Switch style={{ marginLeft: 16 }} checked={this.state.loading} onChange={this.toggle} />
                    </div>
                </Card>
            </div>
        );
    }
}

export default Spins;