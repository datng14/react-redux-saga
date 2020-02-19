import React from "react";
import GoogleMap from "./GoogleMap";
// import Marker from "./Marker";
import SearchBox from "./SearchBox";

// const floatPanel = {
//   position: "absolute",
//   top: "10px",
//   left: "25%",
//   zIndex: 5,
//   backgroundColor: "#fff",
//   padding: "5px",
//   border: "1px solid #999",
//   textAlign: "center",
//   fontFamily: "'Roboto','sans-serif'",
//   lineHeight: "30px",
//   paddingLeft: "10px"
// };

class MapManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapApi: null,
      mapInstance: null,
      mapApiLoaded: false,
      original: null,
      destination: null,
      directionsService: null,
      directionsDisplay: null
    };
  }

  // Fit map to its bounds after the api is loaded
  apiIsLoaded = (map, maps, places) => {
    this.setState({
      mapApi: maps,
      mapInstance: map,
      mapApiLoaded: true,
      directionsService: new maps.DirectionsService(),
      directionsDisplay: new maps.DirectionsRenderer()
    });
  };

  setOriginal = place => {
    this.setState({
      original: place[0]
    });
    this.handleGoogleMapApi();
  };

  setDestination = place => {
    this.setState({
      destination: place[0]
    });
    this.handleGoogleMapApi();
  };

  handleGoogleMapApi = () => {
    let {
      mapApi,
      mapInstance,
      original,
      destination,
      directionsService,
      directionsDisplay
    } = this.state;
    // let locations = [
    //   ["Manly Beach", -33.80010128657071, 151.28747820854187, 2],
    //   ["Bondi Beach", -33.890542, 151.274856, 4],
    //   ["Coogee Beach", -33.923036, 151.259052, 5],
    //   ["Maroubra Beach", -33.950198, 151.259302, 1],
    //   ["Cronulla Beach", -34.028249, 151.157507, 3]
    // ];
    // let flightPath = new mapApi.Polyline({
    //   path: [
    //     // { lat: 10.801847, lng: 106.649211 },
    //     // { lat: 10.800143, lng: 106.667788 },
    //     // { lat: 10.790267, lng: 106.683558 }
    //   ],
    //   geodesic: true,
    //   strokeColor: "#33BD4E",
    //   strokeOpacity: 1,
    //   strokeWeight: 5
    // });
    // flightPath.setMap(mapInstance);
    // const directionsService = new mapApi.DirectionsService();
    // const directionsDisplay = new mapApi.DirectionsRenderer();
    if (directionsDisplay !== null) {
      directionsDisplay.setMap(null);
    }
    // directionsDisplay.setDirections({ routes: [] });
    // directionsDisplay.setMap(null);

    // directionsDisplay.setMap(mapInstance);
    // let infowindow = new mapApi.InfoWindow();

    // let marker, i;
    let request = {
      travelMode: mapApi.TravelMode.DRIVING,
      origin: "",
      destination: ""
    };

    if (original !== null) {
      const { location } = original.geometry;
      request.origin = { lat: location.lat(), lng: location.lng() };
      // var marker = new mapApi.Marker();
      // marker.setMap(mapInstance);
      // marker.setPosition(location);
    }
    if (destination !== null) {
      const { location } = destination.geometry;
      request.destination = { lat: location.lat(), lng: location.lng() };
    }
    directionsService.route(request, (response, status) => {
      console.log("status", status);
      if (status === "OK") {
        directionsDisplay.setMap(mapInstance);
        directionsDisplay.setDirections(response);
        // flightPath.setMap(mapInstance);
      }
    });
  };

  render() {
    const style = {
      width: "100%",
      height: "90vh"
    };
    const { places, mapApi, mapInstance, mapApiLoaded } = this.state;
    return (
      <div style={style}>
        {mapApiLoaded && (
          <>
            <SearchBox
              placeholder="From..."
              map={mapInstance}
              mapApi={mapApi}
              addPlace={this.setOriginal}
            />
            <SearchBox
              placeholder="To..."
              map={mapInstance}
              mapApi={mapApi}
              addPlace={this.setDestination}
            />
          </>
        )}
        <GoogleMap
          defaultZoom={12}
          defaultCenter={[10.800506, 106.652065]}
          bootstrapURLKeys={{
            key: "AIzaSyCf08-veAl7V_yEzDjD5x2861kFtcpWmUo",
            libraries: ["places", "geometry"]
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) =>
            this.apiIsLoaded(map, maps, places)
          }
        >
          {/* onGoogleApiLoaded={this.handleGoogleMapApi} */}
          {/* {places.length === 1 &&
            places.map(place => (
              <Marker
                key={place.id}
                text={place.text}
                lat={place.geometry.location.lat()}
                lng={place.geometry.location.lng()}
              />
            ))} */}
        </GoogleMap>
      </div>
    );
  }
}

export default MapManagement;
