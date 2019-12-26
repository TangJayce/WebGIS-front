import React, {Component} from 'react';
import {Button, Card, Modal} from "antd";

class Modals extends Component {
    state = {
        visible: false,
        formVisible: false,
        confirmLoading: false
    };

    showDefault = () => {
        this.setState({visible: true});
    };

    showForm = () => {
        this.setState({formVisible: true});
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
            formVisible: false
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
            formVisible: false
        });
    };

    handleFormOk = () => {
        this.setState({
            ModalText: '提交中...',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                formVisible: false,
                confirmLoading: false,
            });
        }, 3000);
    };

    render() {
        const {visible, formVisible, confirmLoading, ModalText} = this.state;

        return (
            <div>
                <Card title='基本弹框'>
                    <Button type='primary' onClick={this.showDefault}>点击显示</Button>
                    <Modal
                        title="基本弹框"
                        visible={visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal>
                </Card>
                <Card title='异步提交'>
                    <Button type='primary' onClick={this.showForm}>点击显示</Button>
                    <Modal
                        title="表单"
                        visible={formVisible}
                        onOk={this.handleFormOk}
                        confirmLoading={confirmLoading}
                        onCancel={this.handleCancel}
                        okText="提交"
                        cancelText="取消"
                    >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>{ModalText}</p>
                    </Modal>
                </Card>
            </div>
        );
    }
}

export default Modals;