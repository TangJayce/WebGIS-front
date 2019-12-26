import React, {Component} from 'react';
import {Button, Card, message, DatePicker, Form, Icon, Input, InputNumber, Radio, Select, Upload, Checkbox} from "antd";
import moment from 'moment'
import {getBase64} from "../../../util/utils";
import './index.css'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const {Option} = Select;
const edu = ['小学','初中','高中','本科','专科','研究生'];
let habits = ['唱','跳','rap','篮球','敲代码','游泳','旅游'];

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('只能上传JPG/PNG文件!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('文件大小必须小于2MB!');
    }
    return isJpgOrPng && isLt2M;
}

class RegisterForm extends Component {
    state = {
        imageUrl: '',
        loading: false
    };

    // 图片加载界面的变化
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    handleSubmit = () => {
        let userInfo = this.props.form.getFieldsValue();
        console.log(userInfo);
        this.props.form.validateFields((err,value)=>{
            if(!err){
                if(userInfo.checked) {
                    message.success(`注册成功，欢迎${userInfo.username}`);
                }else {
                    message.info('尚未同意个人协议');
                }
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {imageUrl, loading} = this.state;
        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 4
            },
            wrapperCol: {
                xs: 24,
                sm: 12
            }
        };
        const offsetLayout = {
            wrapperCol: {
                xs: 24,
                sm: {
                    span: 12,
                    offset: 4
                }
            }
        };
        const uploadButton = (
            <div>
                <Icon type={loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">{loading ? '上传中' : '点击上传'}</div>
            </div>
        );

        return (
            <div>
                <Card title='注册表单'>
                    <Form>
                        <FormItem label='用户名' {...formItemLayout}>
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
                        <FormItem label='密码' {...formItemLayout}>
                            {
                                getFieldDecorator('password',{
                                    rules: [
                                        {
                                            required: true,
                                            message: '密码不能为空'
                                        },
                                        {
                                            min: 6,
                                            max: 18,
                                            message: '密码长度必须在6-18之间'
                                        }
                                    ]
                                })(
                                    <Input.Password prefix={<Icon type='lock'/>} placeholder='请输入用户名'/>
                                )
                            }
                        </FormItem>
                        <FormItem label='性别' {...formItemLayout}>
                            {
                                getFieldDecorator('sex',{
                                    initialValue: 1,
                                    rules: []
                                })(
                                    <RadioGroup>
                                        <Radio value={1}>男</Radio>
                                        <Radio value={2}>女</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>
                        <FormItem label='年龄' {...formItemLayout}>
                            {
                                getFieldDecorator('age',{
                                    initialValue: 18,
                                    rules: []
                                })(
                                    <InputNumber/>
                                )
                            }
                        </FormItem>
                        <FormItem label='学历' {...formItemLayout}>
                            {
                                getFieldDecorator('edu',{
                                    initialValue: '3',
                                    rules: []
                                })(
                                    <Select>
                                        {
                                            edu.map((item, index) => (
                                                <Option key={index}>{item}</Option>
                                            ))
                                        }
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label='爱好 (可自定义编辑) ' {...formItemLayout}>
                            {
                                getFieldDecorator('habits',{
                                    initialValue: ['0','1','2','3'],
                                    rules: []
                                })(
                                    <Select mode='tags'>
                                        {
                                            habits.map((item, index) => (
                                                <Option key={index}>{item}</Option>
                                            ))
                                        }
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label='生日' {...formItemLayout}>
                            {
                                getFieldDecorator('birthday',{
                                    initialValue: moment('2000-1-1'),
                                    rules: []
                                })(
                                    <DatePicker/>
                                )
                            }
                        </FormItem>
                        <FormItem label='头像' {...formItemLayout}>
                            {
                                getFieldDecorator('userImg')(
                                    <Upload
                                        listType='picture-card'
                                        showUploadList={false}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        beforeUpload={beforeUpload}
                                        onChange={this.handleChange}
                                        className='avatar-uploader'
                                    >
                                        {
                                            imageUrl?<img src={imageUrl} alt='avatar' style={{ width: '100%' }}/>:uploadButton
                                        }
                                    </Upload>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            {
                                getFieldDecorator('checked')(
                                    <Checkbox>我已经阅读并同意<a>用户协议</a></Checkbox>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            <Button type='primary' onClick={this.handleSubmit}>注册</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Form.create()(RegisterForm);