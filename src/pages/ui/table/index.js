import React, {Component} from 'react';
import {Card, Divider, Table, Tag} from "antd";

const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: '标签',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
            <span>
        {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
                color = 'volcano';
            }
            return (
                <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                </Tag>
            );
        })}
      </span>
        ),
    },
    {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
        <a>Invite {record.name}</a>
        <Divider type="vertical" />
        <a>Delete</a>
      </span>
        ),
    },
];

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

class BasicTable extends Component {
    state = {
        data: [],
        loading: false
    };

    componentDidMount() {
        this.setState({loading: true});
        this.loadData();
    }

    loadData = () => {
        setTimeout(() => {
            this.setState({data});
            this.setState({loading: false});
        },3000);
    };

    render() {
        return (
            <div>
                <Card title='基本表格'>
                    <Table columns={columns} dataSource={data} />
                </Card>
                <Card title='动态加载表格'>
                    <Table
                        columns={columns}
                        dataSource={this.state.data}
                        loading={this.state.loading}
                        pagination={false}
                    />
                </Card>
            </div>
        );
    }
}

export default BasicTable;