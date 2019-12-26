import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Home extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li><Link to='/home'>Home</Link></li>
                    <li><Link to='/about'>About</Link></li>
                    <li><Link to='/topics'>Topics</Link></li>
                    <li><Link to='/page1'>page1</Link></li>
                    <li><Link to='/page2'>page2</Link></li>
                </ul>
                <hr/>
                {this.props.children}
            </div>
        );
    }
}

export default Home;