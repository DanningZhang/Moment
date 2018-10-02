import React from 'react';
import { Register } from './Register';
import {Home} from './Home';
import {Login} from "./Login";
import { Redirect, Switch, Route } from 'react-router-dom'

export class Main extends React.Component {

    getRoot = () => {
        return <Redirect to="/login"/>;
    }

    getLogin = () => {
        return this.props.isLoggedIn ?
            <Redirect to="/home"/> : <Login handleLogin={this.props.handleLogin}/>;
    }

    getHome = () => {
        return this.props.isLoggedIn ? <Home/> : <Redirect to="/login"/>;
    }

    render() {
        return (
            <div className="main">
                <Switch>
                    <Route exact path="/" render={this.getRoot}/>
                    <Route exact path="/login" render={this.getLogin}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/home" render={this.getHome}/>
                    <Route render={this.getRoot}/>
                </Switch>
            </div>
        );
    }
}
