import React, {Component} from 'react';
import {Route,HashRouter as Router,Switch} from "react-router-dom";
import Main from "./Main";
import About from "../route1/About";
import Topics from "../route1/Topics";
import Home from "./Home";
import NotFound from "./NotFound";
import Info from "./Info";

class IRouter extends Component {
    render() {
        return (
            <Router>
                <Home>
                    <Switch>
                        <Route path='/home' render={()=>
                            <Main>
                                <Route path='/home/:info' component={Info}/>
                            </Main>
                        }/>
                        <Route path='/about' component={About}/>
                        <Route path='/topics' component={Topics}/>
                        <Route component={NotFound}/>
                    </Switch>
                </Home>
            </Router>
        );
    }
}

export default IRouter;