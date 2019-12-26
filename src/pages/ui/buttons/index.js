import React, {Component} from 'react';
import {Button, Card, Icon, Radio} from "antd";
import '../ui.less'

class Buttons extends Component {
    state = {
        loaded: false,
        size: 'default'
    };

    Load = () => {
        let loaded = true;
        this.setState({loaded});
    };

    StopLoad = () => {
        let loaded = false;
        this.setState({loaded});
    };

    changeSize = (e) => {
        let size = e.target.value;
        this.setState({size});
    };

    render() {
        let {loaded, size} = this.state;

        return (
            <div>
                <Card title='基础按钮'>
                    <Button type='primary'>主按钮</Button>
                    <Button>默认按钮</Button>
                    <Button type='ghost'>次按钮</Button>
                    <Button type='dashed'>虚线按钮</Button>
                    <Button type='danger'>危险按钮</Button>
                    <Button type='link'>链接按钮</Button>
                    <Button disabled>禁用按钮</Button>
                </Card>
                <Card title='图形按钮'>
                    <Button icon='plus'>创建</Button>
                    <Button icon='edit'>编辑</Button>
                    <Button icon='delete'>删除</Button>
                    <Button shape='circle' icon='search'/>
                    <Button shape='round' type='primary' icon='search'>搜索</Button>
                    <Button type='primary' icon='download'>下载</Button>
                </Card>
                <Card title='加载按钮'>
                    <Button type='primary' icon='loading'>加载图标</Button>
                    <Button type='primary' loading={true}>加载按钮</Button>
                    <Button shape='circle' loading={true}/>
                    <Button loading={loaded} onClick={this.Load}>点击加载</Button>
                    <Button type='primary' onClick={this.StopLoad}>停止加载</Button>
                </Card>
                <Card title='按钮组'>
                    <Button.Group>
                        <Button type='primary' icon='left'>返回</Button>
                        <Button type='primary' icon='right'>前进</Button>
                    </Button.Group>
                    <Button.Group>
                        <Button type='primary'><Icon type='left'/>返回</Button>
                        <Button type='primary'>前进<Icon type='right'/></Button>
                    </Button.Group>
                </Card>
                <Card title='按钮尺寸'>
                    <Radio.Group value={size} onChange={this.changeSize}>
                        <Radio value='small'>小</Radio>
                        <Radio value='default'>中</Radio>
                        <Radio value='large'>大</Radio>
                        <Button size={size} type='primary'>测试大小</Button>
                        <Button size={size}>测试大小</Button>
                    </Radio.Group>
                </Card>
            </div>
        );
    }
}

export default Buttons;