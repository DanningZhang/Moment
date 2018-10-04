import React from 'react';
import { Tabs, Button, Spin } from 'antd';
import {GEO_OPTIONS, POS_KEY} from "../constants";

const TabPane = Tabs.TabPane;

const operations = <Button>Extra Action</Button>;

export class Home extends React.Component {
    state = {
        loadingGeoLocation: false,
        loadingPosts: false,
        error: '',
        posts: [],
    }

    componentDidMount() {
        this.setState({ loadingGeoLocation: true, error: '' });
        this.getGeoLocation();
    }

    getGeoLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeoLocation,
                this.onFailedLoadGeolocation,
                GEO_OPTIONS
            );
        } else {
            this.setState({error : 'Your browser does not support geolocation!'})
        }
    }

    onSuccessLoadGeoLocation = (position) => {
        console.log(position);
        const {latitude, longitude} = position.coords;
        localStorage.setItem(POS_KEY, JSON.stringify({latitude, longitude}));
        this.setState({loadingGeoLocation : false, error : ''});
    }

    onFailedLoadGeolocation = (error) => {
        console.log(error);
        this.setState({loadingGeoLocation: false, error: 'Failed to load geo location!'});
    }

    getGalleryPanelContent = () => {
        if (this.state.error) {
            return <div>{this.state.error}</div>
        } else if (this.state.loadingGeoLocation) {
            return <Spin tip="Loading geolocation..."/>
        } else {
            return null;
        }
    }

    render() {
        return (
            <Tabs tabBarExtraContent={operations} className="main-tabs">
                <TabPane tab="Post" key="1">
                    {this.getGalleryPanelContent()}
                </TabPane>
                <TabPane tab="Map 2" key="2">Content of tab 2</TabPane>
            </Tabs>
        );
    }
}
