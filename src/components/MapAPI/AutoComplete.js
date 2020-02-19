import React from "react";
import { GoogleMap, Autocomplete, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  height: "90vh",
  width: "100%"
};

const center = {
  lat: 10.801343,
  lng: 106.657612
};

let position = {
  lat: 10.801417,
  lng: 106.654415
};

class AutoComplete extends React.Component {
  constructor(props) {
    super(props);

    this.autocomplete = null;

    this.onLoad = this.onLoad.bind(this);
    this.onPlaceChanged = this.onPlaceChanged.bind(this);
  }

  onLoad(autocomplete) {
    console.log("autocomplete: ", autocomplete);
    this.autocomplete = autocomplete;
  }

  onPlaceChanged() {
    if (this.autocomplete !== null) {
      console.log(this.autocomplete.getPlace());
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  }

  render() {
    return (
      <GoogleMap
        id="searchbox-example"
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
      >
        <Autocomplete onLoad={this.onLoad} onPlaceChanged={this.onPlaceChanged}>
          <input
            type="text"
            placeholder="Customized your placeholder"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              left: "50%",
              marginLeft: "-120px"
            }}
          />
        </Autocomplete>
        <Marker onLoad={this.onLoad} position={position} />
      </GoogleMap>
    );
  }
}
export default AutoComplete;
