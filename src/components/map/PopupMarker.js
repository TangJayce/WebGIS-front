import React, {Component} from 'react';
import {Marker, Popup} from "react-leaflet";
import {Avatar, Card, Icon, Skeleton, Modal, message, Input} from "antd";
import PropTypes from 'prop-types'
import MyIcon from "../../config/MyIcon";
import {formatDate} from "../../util/utils";
import {$deletePoint, $updatePoint} from "../../util/api";
import {connect} from "react-redux";

const { Meta } = Card;

class PopupMarker extends Component {
    state = {
        editVisible: false,
        editLoading: false,
        description: this.props.description,
        draggable: false
    };

    static propTypes = {
        id: PropTypes.number.isRequired,
        position: PropTypes.array.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        changeDescription: PropTypes.func.isRequired,
        deletePoint: PropTypes.func.isRequired,
        changeLatlng: PropTypes.func.isRequired,
    };

    // 显示信息详情
    showMore = () => {
        let {position, name, description, time} = this.props;
        if(description && name && position && time) {
            Modal.info({
                title: '信息详情',
                content: (
                    <div>
                        <span>当前坐标类型 : {name+'发布的内容'}</span><br/>
                        <span>纬度 : {position[0]}</span><br/>
                        <span>经度 : {position[1]}</span><br/>
                        <span>描述信息 : {description}</span><br/>
                        <span>最后更新时间 : {time}</span>
                    </div>
                ),
                // onOk() {
                //     message.info('了解')
                // }
            });
        }else {
            message.error("信息不完整");
        }
    };

    // 判断是否保存已修改的内容
    is_save = () => {
        if(this.state.description !== this.props.description) {
            Modal.confirm({
                title: '是否保存已修改的内容',
                okText: '保存',
                cancelText: '取消',
                onOk: () => {this.UpdateMsg()},
                onCancel: () => {
                    this.setState({
                        description: this.props.description,
                        editVisible: false
                    })
                }
            });
        }else {
            this.setState({editVisible: false})
        }
    };

    // 保存修改后的点信息
    UpdateMsg = () => {
        if(this.props.userName === this.props.name) {
            let {id, index, position, userName} = this.props;
            let {description} = this.state;
            let lat = position[0];
            let lng = position[1];

            this.setState({
                editLoading: true,
            });
            let time = formatDate(new Date().getTime());
            $updatePoint(id, description, time, lat, lng, userName).then(() => {
                message.success('保存成功');
                this.props.changeDescription(index, description, time);
            }).catch(() => {
                message.error('保存失败');
            }).finally(() => {
                this.setState({
                    editLoading: false,
                    editVisible: false
                });
            });
        }
        else{
            message.error('没有权限更改');
        }
    };

    // 删除坐标点
    delMsg = () => {
        if(this.props.userName === this.props.name) {
            Modal.confirm({
                title: '你确定要删除吗',
                content: '删除后将不会显示这个坐标点',
                okText: '删除',
                okType: 'danger',
                cancelText: '取消',
                onOk: () => {
                    $deletePoint(this.props.id).then(() => {
                        message.success('删除成功');
                        this.props.deletePoint(this.props.index);
                    }).catch(() => {
                        message.error('删除失败');
                    })
                },
                // onCancel() {
                //     console.log('取消删除')
                // }
            });
        }
        else{
            message.error('没有权限删除');
        }
    };

    // 移动按键的点击事件
    handleDrag = () => {
        let {draggable} = this.state;
        if(this.props.userName === this.props.name) {
            this.setState({draggable: !draggable});
        }
        else{
            message.error('没有权限移动');
        }
    };

    // 移动坐标点后更新数据库
    updateLatlng = (e) => {
        const {changeLatlng} = this.props;
        console.log(e.target._latlng);
        changeLatlng(this.props.index, e.target._latlng.lng, e.target._latlng.lat);
    };

    render() {
        let {position, name} = this.props;
        let {editVisible, editLoading, description, draggable} = this.state;

        return (
            <div>
                <Modal
                    title='编辑内容'
                    visible={editVisible}
                    confirmLoading={editLoading}
                    onOk={this.UpdateMsg}
                    onCancel={this.is_save}
                    okText="保存"
                    cancelText="取消"
                >
                    <Input.TextArea
                        value={description}
                        rows={4}
                        onChange={(e) => {
                            this.setState({
                                description: e.target.value
                            })
                        }}
                    />
                </Modal>
                <Marker position={position} icon={MyIcon} draggable={draggable} onDragend={this.updateLatlng}>
                    <Popup>
                        <Card
                            style={{width: 250}}
                            loading={false}
                            actions={[
                                <Icon type="ellipsis" key="ellipsis" onClick={this.showMore}/>,
                                <Icon type="drag" key="drag" onClick={this.handleDrag}/>,
                                <Icon type="edit" key="edit" onClick={()=>{this.setState({editVisible: true})}}/>,
                                <Icon type="delete" key="delete" onClick={this.delMsg}/>
                            ]}
                        >
                            <Skeleton loading={!description} avatar active>
                                <Meta
                                    avatar={
                                        <Avatar icon="user" src={require('../../assets/avatar.jpg')} />
                                    }
                                    title={name + '发布的内容'}
                                    description={description}
                                />
                            </Skeleton>
                        </Card>
                    </Popup>
                </Marker>
            </div>
        );
    }
}

const mapStateTpProps = (state) => {
    return{
        userName: state.userName
    }
};

export default connect(mapStateTpProps)(PopupMarker);