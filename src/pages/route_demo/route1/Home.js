import React, {Component} from 'react';
import {HashRouter, Link, Route, Switch} from "react-router-dom";
import Main from "./Main";
import About from "./About";
import Topics from "./Topics";

class Home extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/about'>About</Link></li>
                        <li><Link to='/topics'>Topics</Link></li>
                    </ul>
                    <hr/>
                    <Switch>
                        <Route exact={true} path='/' component={Main}/>
                        <Route path='/about' component={About}/>
                        <Route path='/topics' component={Topics}/>
                    </Switch>
                    {/*<Route exact={true} path='/' component={Main}/>*/}
                    {/*<Route path='/about' component={About}/>*/}
                    {/*<Route path='/topics' component={Topics}/>*/}
                </div>
            </HashRouter>
        );
    }
}

export default Home;