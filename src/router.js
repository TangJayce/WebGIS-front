import React, {Component} from 'react';
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import App from "./App";
import Admin from "./components/admin";
import Login from "./components/Login";
import Buttons from "./pages/ui/buttons";
import NoMatch from "./pages/ui/nomatch";
import Home from "./pages/home";
import Modals from "./pages/ui/modals";
import Spins from "./pages/ui/spins";
import Notifications from "./pages/ui/notifications";
import LoginForm from "./pages/form/login";
import RegisterForm from "./pages/form/register";
import BasicTable from "./pages/ui/table";
import AntV from "./pages/AntV";
import MapPosition from "./pages/maps/MapPosition";
import TestPage from "./pages/test";
import MapEdit from "./pages/maps/MapEdit";
import MapLayers from "./pages/maps/MapLayers";
import MapLoad from "./pages/maps/MapLoad";

class IRouter extends Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Route exact path='/' component={Login}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/admin' render={()=>
                        <Admin>
                            <Switch>
                                <Route path='/admin/home' component={Home}/>
                                <Route path='/admin/ui/buttons' component={Buttons}/>
                                <Route path='/admin/ui/modals' component={Modals}/>
                                <Route path='/admin/ui/spins' component={Spins}/>
                                <Route path='/admin/ui/notifications' component={Notifications}/>
                                <Route path='/admin/ui/table' component={BasicTable}/>
                                <Route path='/admin/form/login' component={LoginForm}/>
                                <Route path='/admin/form/register' component={RegisterForm}/>
                                <Route path='/admin/map/position' component={MapPosition}/>
                                <Route path='/admin/map/layers' component={MapLayers}/>
                                <Route path='/admin/map/load' component={MapLoad}/>
                                <Route path='/admin/map/edit' component={MapEdit}/>
                                <Route path='/admin/antv' component={AntV}/>
                                <Route path='/admin/test' component={TestPage}/>
                                <Route component={NoMatch}/>
                            </Switch>
                        </Admin>
                    }/>
                    <Redirect to='/login'/>
                </App>
            </HashRouter>
        );
    }
}

export default IRouter;