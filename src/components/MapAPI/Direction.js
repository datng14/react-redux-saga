import React from "react";
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
  Autocomplete
} from "@react-google-maps/api";

class Directions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      response: null,
      travelMode: "DRIVING",
      origin: "",
      destination: ""
    };

    this.directionsCallback = this.directionsCallback.bind(this);
    this.checkDriving = this.checkDriving.bind(this);
    this.checkBicycling = this.checkBicycling.bind(this);
    this.checkTransit = this.checkTransit.bind(this);
    this.checkWalking = this.checkWalking.bind(this);
    this.getOrigin = this.getOrigin.bind(this);
    this.getDestination = this.getDestination.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);

    this.autocomplete = null;

    this.onLoad = this.onLoad.bind(this);
    this.onPlaceChanged = this.onPlaceChanged.bind(this);
  }

  directionsCallback(response) {
    if (response !== null) {
      if (response.status === "OK") {
        this.setState(() => ({
          response
        }));
      }
    }
  }

  checkDriving({ target: { checked } }) {
    checked &&
      this.setState(() => ({
        travelMode: "DRIVING"
      }));
  }

  checkBicycling({ target: { checked } }) {
    checked &&
      this.setState(() => ({
        travelMode: "BICYCLING"
      }));
  }

  checkTransit({ target: { checked } }) {
    checked &&
      this.setState(() => ({
        travelMode: "TRANSIT"
      }));
  }

  checkWalking({ target: { checked } }) {
    checked &&
      this.setState(() => ({
        travelMode: "WALKING"
      }));
  }

  getOrigin(ref) {
    this.origin = ref;
  }

  getDestination(ref) {
    this.destination = ref;
  }

  onClick() {
    if (this.destination.value !== "") {
      this.setState(() => ({
        // origin: this.origin.value,
        destination: this.destination.value
      }));
    }
  }

  onMapClick(...args) {
    console.log("onClick args: ", args);
  }

  onLoad(autocomplete) {
    this.autocomplete = autocomplete;
  }

  onPlaceChanged() {
    if (this.autocomplete !== null) {
      let data = this.autocomplete.getPlace();
      this.setState({
        origin: data.formatted_address
      });
    }
  }

  render() {
    return (
      <div className="map">
        <div className="map-settings">
          <hr className="mt-0 mb-3" />

          <div className="row">
            <div className="col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="ORIGIN">Origin</label>
                <br />
                {/* <input
                  id="ORIGIN"
                  className="form-control"
                  type="text"
                  ref={this.getOrigin}
                /> */}
                <Autocomplete
                  onLoad={this.onLoad}
                  onPlaceChanged={this.onPlaceChanged}
                >
                  <input type="text" placeholder="From" />
                </Autocomplete>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="DESTINATION">Destination</label>
                <br />
                <input
                  id="DESTINATION"
                  className="form-control"
                  type="text"
                  ref={this.getDestination}
                />
              </div>
            </div>
          </div>

          <div className="d-flex flex-wrap">
            <div className="form-group custom-control custom-radio mr-4">
              <input
                id="DRIVING"
                className="custom-control-input"
                name="travelMode"
                type="radio"
                checked={this.state.travelMode === "DRIVING"}
                onChange={this.checkDriving}
              />
              <label className="custom-control-label" htmlFor="DRIVING">
                Driving
              </label>
            </div>

            <div className="form-group custom-control custom-radio mr-4">
              <input
                id="BICYCLING"
                className="custom-control-input"
                name="travelMode"
                type="radio"
                checked={this.state.travelMode === "BICYCLING"}
                onChange={this.checkBicycling}
              />
              <label className="custom-control-label" htmlFor="BICYCLING">
                Bicycling
              </label>
            </div>

            <div className="form-group custom-control custom-radio mr-4">
              <input
                id="TRANSIT"
                className="custom-control-input"
                name="travelMode"
                type="radio"
                checked={this.state.travelMode === "TRANSIT"}
                onChange={this.checkTransit}
              />
              <label className="custom-control-label" htmlFor="TRANSIT">
                Transit
              </label>
            </div>

            <div className="form-group custom-control custom-radio mr-4">
              <input
                id="WALKING"
                className="custom-control-input"
                name="travelMode"
                type="radio"
                checked={this.state.travelMode === "WALKING"}
                onChange={this.checkWalking}
              />
              <label className="custom-control-label" htmlFor="WALKING">
                Walking
              </label>
            </div>
          </div>

          <button
            className="btn btn-primary"
            type="button"
            onClick={this.onClick}
          >
            Build Route
          </button>
        </div>

        <div className="map-container">
          <GoogleMap
            // required
            id="direction-example"
            // required
            mapContainerStyle={{
              height: "400px",
              width: "100%"
            }}
            // required
            zoom={10}
            // required
            center={{
              lat: 10.801343,
              lng: 106.657612
            }}
          >
            {this.state.destination !== "" && this.state.origin !== "" && (
              <DirectionsService
                // required
                options={{
                  destination: this.state.destination,
                  origin: this.state.origin,
                  travelMode: this.state.travelMode
                }}
                // required
                callback={this.directionsCallback}
              />
            )}

            {this.state.response !== null && (
              <DirectionsRenderer
                // required
                options={{
                  directions: this.state.response
                }}
              />
            )}
          </GoogleMap>
        </div>
      </div>
    );
  }
}

export default Directions;
