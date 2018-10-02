import React from 'react';
import { Register } from './Register';
import {Login} from "./Login";
import { Redirect, Switch, Route } from 'react-router-dom'

export class Main extends React.Component {

    getRoot = () => {
        return <Redirect to="/login"/>;
    }

    render() {
        return (
            <div className="main">
                <Switch>
                    <Route exact path="/" render={this.getRoot}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route render={this.getRoot}/>
                </Switch>
            </div>
        );
    }
}
