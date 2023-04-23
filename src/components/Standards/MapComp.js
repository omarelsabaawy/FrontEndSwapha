import React from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

function MapComp() {
    const { isLoaded } = useJsApiLoader({ googleMapsApiKey: "AIzaSyDA9mi784JAq0B83t5jSynYZJQp6CdtHg4" });

    if (!isLoaded) {
        return (<div>Loading...</div>)
    } else {
        return (<Map />)
    }
}

function Map() {
    return (
        <GoogleMap center={{ lat: 40, lng: -80 }} zoom={10} mapContainerClassName="mapContainer" >
            <Marker position={{ lat: 40, lng: -80 }} />
        </GoogleMap>
    )
}

export default MapComp