import React from "react";
import GoogleMap from "./GoogleMap";
import Marker from "./Marker";
import SearchBox from "./SearchBox";

class MapManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapApi: null,
      mapInstance: null,
      mapApiLoaded: false,
      places: []
    };
  }

  // Fit map to its bounds after the api is loaded
  apiIsLoaded = (map, maps, places) => {
    this.setState({
      mapApi: maps,
      mapInstance: map,
      mapApiLoaded: true
    });
  };

  addPlace = place => {
    this.setState(prevState => ({
      places: [...prevState.places, ...place]
    }));
    // if (this.state.places.length == 2)
    this.handleGoogleMapApi();
  };

  handleGoogleMapApi = () => {
    var flightPath = new this.state.mapApi.Polyline({
      path: [
        // { lat: 53.480759, lng: -2.242631 }
        // { lat: 51.507351, lng: -0.127758 }
        // { lat: 55.953252, lng: -3.188267 }
      ],
      // geodesic: true,
      strokeColor: "#33BD4E",
      strokeOpacity: 1,
      strokeWeight: 5
    });
    flightPath.setMap(this.state.mapInstance);

    var directionsService = new this.state.mapApi.DirectionsService();
    var directionsDisplay = new this.state.mapApi.DirectionsRenderer();
    directionsDisplay.setMap(this.state.mapInstance);
    var inputRoute = {
      travelMode: "DRIVING",
      origin:
        this.state.places[0].geometry.location.lat() +
        "," +
        this.state.places[0].geometry.location.lng(),
      destination: this.state.places[1]
        ? this.state.places[1].geometry.location.lat() +
          "," +
          this.state.places[1].geometry.location.lng()
        : ""
    };
    directionsService.route(
      inputRoute,
      (DirectionsResult, DirectionsStatus) => {
        if (DirectionsStatus === "OK") {
          directionsDisplay.setDirections(DirectionsResult);
        }
      }
    );
  };

  render() {
    const style = {
      width: "100vw",
      height: "100vh"
    };
    const { places, mapApi, mapInstance, mapApiLoaded } = this.state;
    return (
      <div style={style}>
        {mapApiLoaded && (
          <SearchBox
            placeholder="From..."
            map={mapInstance}
            mapApi={mapApi}
            addPlace={this.addPlace}
          />
        )}
        <GoogleMap
          defaultZoom={15}
          defaultCenter={[10.800506, 106.652065]}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) =>
            this.apiIsLoaded(map, maps, places)
          }
        >
          {/* onGoogleApiLoaded={this.handleGoogleMapApi} */}
          {places.length == 1 &&
            places.map(place => (
              <Marker
                key={place.id}
                text={place.text}
                lat={place.geometry.location.lat()}
                lng={place.geometry.location.lng()}
              />
            ))}
        </GoogleMap>
      </div>
    );
  }
}

export default MapManagement;
