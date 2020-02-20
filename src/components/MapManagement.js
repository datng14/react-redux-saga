import React from "react";
import SearchBox from "./SearchBox";
import GoogleMapReact from "google-map-react";

class MapManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapApi: null,
      mapInstance: null,
      mapApiLoaded: false,
      original: null,
      destination: null,
      pickup: null,
      directionsService: null,
      directionsDisplay: null
    };
  }

  // Fit map to its bounds after the api is loaded
  apiIsLoaded = (map, maps) => {
    this.setState({
      mapApi: maps,
      mapInstance: map,
      mapApiLoaded: true,
      directionsService: new maps.DirectionsService(),
      directionsDisplay: new maps.DirectionsRenderer()
    });
    // let marker = new this.state.mapApi.Marker({
    //   position: { lat: 10.800476, lng: 106.652128 },
    //   map: this.state.mapInstance
    // });
    // marker.setMap(this.state.mapInstance);
    // this.moveMarker(marker, this.state.mapApi, this.state.mapInstance, 1);
  };

  moveMarker = (marker, mapApi, mapInstance, i) => {
    // the first latlng is the inital location
    let locations = [
      [10.800977, 106.652078],
      [10.800472, 106.652185],
      [10.800441, 106.652503],
      [10.800357, 106.653653],
      [10.801291, 106.653818],
      [10.801288, 106.654249],
      [10.801162, 106.655639],
      [10.801063, 106.656864],
      [10.800954, 106.657885]
    ];
    //delayed so you can see it move
    // for (let i = 0; i < locations.length; i++) {
    let numDeltas = 100;
    setTimeout(
      () => {
        let deltaLat = (locations[i][0] - locations[0][0]) / numDeltas;
        let deltaLng = (locations[i][1] - locations[0][1]) / numDeltas;
        locations[0][0] += deltaLat;
        locations[0][1] += deltaLng;
        marker.setPosition(new mapApi.LatLng(locations[i][0], locations[i][1]));
        mapInstance.panTo(new mapApi.LatLng(locations[i][0], locations[i][1]));
        i++;
        if (i < locations.length - 1)
          this.moveMarker(marker, mapApi, mapInstance, i);
      },
      3000,
      marker,
      mapApi,
      mapInstance
    );

    // }
  };

  setOriginal = place => {
    this.setState({
      original: place[0]
    });
    this.handleGoogleMapApi();
  };

  setPickup = place => {
    this.setState({
      pickup: place[0]
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

    let request = {
      travelMode: mapApi.TravelMode.DRIVING,
      origin: "",
      destination: ""
      // waypoints: [],
      // provideRouteAlternatives: true
    };
    var iconBase = "http://localhost:3001/";
    var icons = {
      blue: iconBase + "blue.png",
      red: iconBase + "red.png",
      truck: iconBase + "red.png",
      black: iconBase + "black.png"
    };
    if (original !== null) {
      const { location } = original.geometry;
      request.origin = { lat: location.lat(), lng: location.lng() };
    }
    if (destination !== null) {
      const { location } = destination.geometry;
      request.destination = destination.geometry;
    }
    // if (pickup !== null) {
    //   const { location } = pickup.geometry;
    //   request.waypoints.push({
    //     location: { lat: location.lat(), lng: location.lng() },
    //     stopover: true
    //   });
    // }

    directionsService.route(request, (response, status) => {
      if (status === "OK") {
        // directionsDisplay.setMap(mapInstance);
        if (original !== null) {
          new mapApi.Marker({
            position: original.geometry.location,
            icon: icons.blue,
            map: mapInstance
          });
        }
        if (destination !== null) {
          new mapApi.Marker({
            position: destination.geometry.location,
            icon: icons.blue,
            map: mapInstance
          });
        }
        if (original !== null && destination !== null) {
          const routePolyline = new mapApi.Polyline({
            path: response.routes[0].overview_path,
            strokeColor: "green",
            strokeWeigth: 2,
            strokeOpacity: 2
          });
          routePolyline.setMap(mapInstance);
          directionsDisplay.setDirections(response);
        }
        // const bounds = new this.state.mapApi.LatLngBounds();
        // bounds.union(response.routes[0].bounds);
        // mapInstance.fitBounds(bounds);
      }
    });
  };

  render() {
    const style = {
      width: "100%",
      height: "80vh"
    };
    const { mapApi, mapInstance, mapApiLoaded } = this.state;
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
            {/* <SearchBox
              placeholder="Pickup..."
              map={mapInstance}
              mapApi={mapApi}
              addPlace={this.setPickup}
            /> */}
            <SearchBox
              placeholder="To..."
              map={mapInstance}
              mapApi={mapApi}
              addPlace={this.setDestination}
            />
          </>
        )}
        <GoogleMapReact
          defaultZoom={12}
          defaultCenter={[10.800977, 106.652078]}
          bootstrapURLKeys={{
            key: "AIzaSyCf08-veAl7V_yEzDjD5x2861kFtcpWmUo",
            libraries: ["places", "geometry"]
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.apiIsLoaded(map, maps)}
        ></GoogleMapReact>
      </div>
    );
  }
}
export default MapManagement;
