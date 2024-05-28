import React from "react";
import { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@mui/material";

import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'
//import PlaceDetails from './components/PlaceDetails/PlaceDetails'
import { getPlacesData } from './api'


function App() {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState();
  const [bounds, setBounds] = useState(null);
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('Rating');
  const [filteredPlaces, setFilteredPlaces] = useState([])

  useEffect(() => {
    const fetchCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setCoordinates({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting current position:", error);
          setCoordinates({ lat: 0, lng: 0 });
        }
      );
    };

    fetchCurrentLocation();
  }, []);



  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating)
    setFilteredPlaces(filteredPlaces)

  }, [rating]);



  useEffect(() => {
    if (bounds) {
      console.log('Coordinates:', coordinates, 'Bounds:', bounds);
      getPlacesData(type, bounds)
        .then((data) => {
          console.log(data);
          setPlaces(data);
          setFilteredPlaces([])
        })
        .catch((error) => {
          console.error('Error fetching places data:', error);
        });
    }
  }, [type, coordinates, bounds]);
  const containerStyle = {
    height: '85vh',
    overflowY: 'scroll',
    paddingRight: '20px'
  };

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}
          style={containerStyle}
        >
          {/* places={places} */}
          <List
            // places={filteredPlaces.length ? filteredPlaces : places}
            places={places}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}
          style={{ height: '100vh' }}
        >
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            // places={filteredPlaces.length ? filteredPlaces : places}
            places={places}

          />
        </Grid>
      </Grid>
    </>
  );
}
export default App;