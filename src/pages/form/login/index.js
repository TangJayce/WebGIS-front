import React, {Component} from 'react';
import {Button, Card, Checkbox, Form, Icon, Input, message} from "antd";

const FormItem = Form.Item;

class LoginForm extends Component {
    handleSubmit = e => {
        let userInfo = this.props.form.getFieldsValue();//获取表单所有信息
        this.props.form.validateFields((err,value)=>{
            if(!err){
                message.success(`恭喜${userInfo.username}提交成功，密码为${userInfo.password}`);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <div>
                <Card title='登录水平表单'>
                    <Form layout='inline'>
                        <FormItem>
                            <Input placeholder='请输入用户名'/>
                        </FormItem>
                        <FormItem>
                            <Input placeholder='请输入密码'/>
                        </FormItem>
                        <FormItem>
                            <Button type='primary'>登录</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card title='登录表单'>
                    <Form style={{maxWidth: 300}}>
                        <FormItem>
                            {
                                getFieldDecorator('username',{
                                    initialValue: 'Jayce',
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
                                    initialValue: '123',
                                    rules: [
                                        {
                                            min: 6,
                                            max: 18,
                                            message: '密码长度必须在6-18之间'
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
                                    <Checkbox>记住密码</Checkbox>
                                )
                            }
                            <a style={{float: 'right'}}>忘记密码</a>
                        </FormItem>
                        <FormItem>
                            <Button type='primary' onClick={this.handleSubmit}>登录</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Form.create()(LoginForm);