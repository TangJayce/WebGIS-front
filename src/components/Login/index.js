import React, {Component} from 'react';

import './index.less'
import {Button, Card, Checkbox, Form, Icon, Input, message} from "antd";
import {$login} from "../../util/api";
import {connect} from "react-redux";
import {setUserName} from "../../redux/action";

const FormItem = Form.Item;

class Login extends Component {
    state = {
        loading: false
    };

    handleSubmit = e => {
        this.setState({loading: true});
        let userInfo = this.props.form.getFieldsValue();//获取表单所有信息
        this.props.form.validateFields((err,value)=>{
            if(!err){
                setTimeout(()=>{
                    $login({
                        user_name: userInfo.username,
                        user_password: userInfo.password
                    }).then((data)=>{
                        message.success(`欢迎回来，${userInfo.username}`);
                        this.props.dispatch(setUserName(userInfo.username));
                        this.props.history.push('/admin/home');
                    }).catch((err)=>{
                        message.error('登录失败');
                        console.log(err);
                    }).finally(()=>{
                        this.setState({loading: false});
                    });
                },1000);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {loading} = this.state;

        return (
            <div className='login-page'>
                <Card title='登录' className='login-card'>
                    <Form>
                        <FormItem>
                            {
                                getFieldDecorator('username',{
                                    initialValue: 'admin',
                                    rules: [
                                        {
                                            required: true,
                                            message: '用户名不能为空'
                                        }
                                    ]
                                })(
                                    <Input prefix={<Icon type='user'/>} placeholder='请输入用户名'/>
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('password',{
                                    initialValue: 'admin',
                                    rules: [
                                        {
                                            min: 3,
                                            max: 18,
                                            message: '密码长度必须在3-18之间'
                                        }
                                    ]
                                })(
                                    <Input.Password prefix={<Icon type='lock'/>} placeholder='请输入密码'/>
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('remember',{
                                    valuePropName: 'checked',
                                    initialValue: true
                                })(
                                    <Checkbox style={{float: 'left'}}>记住密码</Checkbox>
                                )
                            }
                            <a style={{float: 'right'}}>忘记密码</a>
                        </FormItem>
                        <FormItem>
                            <Button loading={loading} type='primary' onClick={this.handleSubmit}>登录</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Form.create()(connect()(Login));