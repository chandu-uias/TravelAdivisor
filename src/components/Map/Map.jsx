import React from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { Paper, Typography, useMediaQuery } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useState } from "react";

import useStyles from './style';

const containerStyle = {
    width: '100%',
    height: '100vh'
};

const center = {
    lat: 0,
    lng: 0
};
const throttle = (func, limit) => {
    let inThrottle;
    return function (...args) {
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};

function Map({ setCoordinates, setBounds, coordinates, places }) {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');
    const [selectedPlace, setSelectedPlace] = useState(null);


    const handleOnLoad = (map) => {
        const handleOnIdle = () => {
            const bounds = map.getBounds();
            if (bounds) {
                const ne = bounds.getNorthEast();
                const sw = bounds.getSouthWest();
                setBounds({
                    ne: { lat: ne.lat(), lng: ne.lng() },
                    sw: { lat: sw.lat(), lng: sw.lng() }
                });
                setCoordinates({
                    lat: map.getCenter().lat(),
                    lng: map.getCenter().lng()
                });
            }
        };

        map.addListener('idle', throttle(handleOnIdle, 2000))
    };

    return (
        <div className={classes.mapContainer}>
            <LoadScript googleMapsApiKey="AIzaSyAxNdW8ya5hW6hmLh08BE8fqh0IUa6Z14s">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    defaultCenter={coordinates}
                    center={coordinates}
                    zoom={14}

                    options={''}
                    onLoad={handleOnLoad}
                >
                    {places?.map((place, i) => (
                        <Marker
                            key={i}
                            position={{ lat: Number(place.latitude), lng: Number(place.longitude) }}
                            onClick={() => setSelectedPlace(place)}
                            icon={!isDesktop ? {
                                url: '/path/to/your/custom/icon.svg',
                                scaledSize: new window.google.maps.Size(20, 20)
                            } : null}
                        />
                    ))}

                    {selectedPlace && (
                        <InfoWindow
                            position={{ lat: Number(selectedPlace.latitude), lng: Number(selectedPlace.longitude) }}
                            onCloseClick={() => setSelectedPlace(null)}
                        >
                            <Paper elevation={3} className={classes.paper}>
                                <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                                    {selectedPlace.name}
                                </Typography>
                                <img
                                    className={classes.pointer}
                                    src={selectedPlace.photo ? selectedPlace.photo.images.large.url : "https://images.app.goo.gl/tWdfotb6F6R1YbFN9"}
                                    alt={selectedPlace.name}
                                />
                            </Paper>
                        </InfoWindow>
                    )}

                </GoogleMap>
            </LoadScript>
        </div>
    );
}

export default Map;
