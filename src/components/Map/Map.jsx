// import React from "react";
// import GoogleMapReact from "google-map-react";
// import { Paper, Typography, useMediaQuery } from "@mui/material";
// import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
// // import Rating from "@mui/material";
// // import Rating from "@mui/material/lab";

// import useStyles from './style'
// function Map() {
//     //{ setCoordinates, setBounds, coordinates }
//     const classes = useStyles();
//     const isMobile = useMediaQuery('(min-width:600px)');

//     const coordinates = { lat: 0, lng: 0 }
//     // const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
//     //  AIzaSyAIU2IPmG6XTebB_Ovv3ZQVBFUpY4PJgdI
//     //AIzaSyCFwj2hE_0-OFAX25WxLQNojAwlt_gl2ek
//     // REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSyAxNdW8ya5hW6hmLh08BE8fqh0IUa6Z14s


//     return (
//         <div className={classes.mapContainer}>
//             <GoogleMapReact
//                 bootstrapURLKeys={{ key: 'AIzaSyAxNdW8ya5hW6hmLh08BE8fqh0IUa6Z14s' }}
//                 defaultCenter={coordinates}
//                 center={coordinates}
//                 defaultZoom={14}
//                 margin={[50, 50, 50, 50]}
//                 options={''}
//             // onChange={''}
//             // onChange={(e) => {
//             //     console.log(e);
//             //     setCoordinates({ lat: e.center.lat, lng: e.center.lng });
//             //     setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
//             // }}

//             // onChildClick={''}
//             >

//             </GoogleMapReact>

//         </div>

//     )
// }
// export default Map;



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


// import React from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
// import { Paper, Typography, useMediaQuery } from "@mui/material";
// import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
// import useStyles from './style';

// const containerStyle = {
//     width: '100%',
//     height: '100vh'
// };

// const center = {
//     lat: 0,
//     lng: 0
// };

// function Map() {
//     const classes = useStyles();
//     const isMobile = useMediaQuery('(min-width:600px)');

//     // Dummy marker coordinates (example)
//     const markerCoordinates = [
//         { lat: 0, lng: 0 },
//         { lat: 0.01, lng: 0.01 },
//     ];

//     return (
//         <div className={classes.mapContainer}>
//             <LoadScript googleMapsApiKey="AIzaSyAxNdW8ya5hW6hmLh08BE8fqh0IUa6Z14s">
//                 <GoogleMap
//                     mapContainerStyle={containerStyle}
//                     center={center}
//                     zoom={14}
//                     options={{}}
//                     onLoad={(map) => {
//                         // Perform actions when the map loads
//                     }}
//                     onUnmount={(map) => {
//                         // Perform actions when the map unmounts
//                     }}
//                 >
//                     {markerCoordinates.map((coords, index) => (
//                         <Marker key={index} position={coords} />
//                     ))}
//                     {/* Add any other components or logic here */}
//                 </GoogleMap>
//             </LoadScript>
//         </div>
//     );
// }

// export default Map;
