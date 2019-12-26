import React, {Component} from 'react';
import {Card, Button, message} from "antd";
import {$getGeoJSONByName} from "../../util/api";

class TestPage extends Component {
    state = {
        loading: false
    };

    showTest = () => {
        this.setState({loading: true});
        $getGeoJSONByName('Australia').then((data)=>{
            message.success(data.msg);
            console.log(data);
        }).catch((err)=>{
            message.error(err);
        }).finally(()=>{
            this.setState({loading: false});
        })
    };

    render() {
        let {loading} = this.state;

        return (
            <div>
                <Card>
                    <Button onClick={this.showTest} loading={loading}>测试后端</Button>
                </Card>
            </div>
        );
    }
}

export default TestPage;