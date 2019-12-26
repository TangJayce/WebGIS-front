import React, {Component} from 'react';
import {Button, Card, notification} from "antd";

class Notifications extends Component {
    state = {
        config: {
            message: '发工资了',
            description: '上个月考勤18，迟到8天，实发工资250，请笑纳'
        }
    };

    openDefaultNotification = () => {
        notification.open({
            message: 'Notification Title',
            description:
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    };

    openNotification = (type, direction) => {
        if(direction){
            notification.config({
                placement: direction
            })
        }
        if(notification[type]) {
            notification[type](this.state.config);
        }
        else {
            notification.error({
                message: '错误',
                description: '不存在此类型的通知框'
            });
        }
    };

    render() {
        return (
            <div>
                <Card title='基本用法'>
                    <Button type='primary' onClick={this.openDefaultNotification}>点击通知</Button>
                    最简单的用法，4.5 秒后自动关闭。
                </Card>
                <Card title='带有图标的通知框'>
                    <Button type='primary' onClick={() => this.openNotification('success')}>成功</Button>
                    <Button type='primary' onClick={() => this.openNotification('info')}>信息</Button>
                    <Button type='primary' onClick={() => this.openNotification('warning')}>警告</Button>
                    <Button type='primary' onClick={() => this.openNotification('error')}>错误</Button>
                </Card>
                <Card title='自定义位置的通知框'>
                    <Button type='primary' onClick={() => this.openNotification('success','topLeft')}>成功(左上)</Button>
                    <Button type='primary' onClick={() => this.openNotification('info','topRight')}>信息(右上)</Button>
                    <Button type='primary' onClick={() => this.openNotification('warning','bottomLeft')}>警告(左下)</Button>
                    <Button type='primary' onClick={() => this.openNotification('error','bottomRight')}>错误(右下)</Button>
                </Card>
            </div>
        );
    }
}

export default Notifications;