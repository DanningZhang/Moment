import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import {POS_KEY} from "../constants";
import {AroundMarker} from "./AroundMarker"

class AroundMap extends React.Component{
    saveMapRef = (map) => {
        this.map = map;
        window.map = map;
    }

    reloadMarkers = () => {
        const center = this.map.getCenter();
        const location = { lat: center.lat(), lon: center.lng() };
        const range = this.getRange();
        this.props.loadNearbyPosts(location, range);
        //console.log(range);
    }

    getRange = () => {
        const google = window.google;
        const center = this.map.getCenter();
        const bounds = this.map.getBounds();
        if (center && bounds) {
            const ne = bounds.getNorthEast();
            const right = new google.maps.LatLng(center.lat(), ne.lng());
            return 0.001 * google.maps.geometry.spherical.computeDistanceBetween(center, right);
        }
    }


    render() {
        const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));
        console.log(this.props.posts)

        return (
            <GoogleMap
                ref={this.saveMapRef}
                onDragEnd={this.reloadMarkers}
                onZoomChanged={this.reloadMarkers}
                defaultZoom={11}
                defaultCenter={{ lat: lat, lng: lon }}
            >
                {
                    this.props.posts.map((post) => (
                        <AroundMarker
                            key={post.url}
                            post={post}
                        />)
                    )
                }
            </GoogleMap>
        );
    }
}

export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMap));