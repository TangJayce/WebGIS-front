import React, {Component} from 'react';

class Info extends Component {
    render() {
        return (
            <div>
                这是信息 : {this.props.match.params.info}
            </div>
        );
    }
}

export default Info;