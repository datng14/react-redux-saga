import React from "react";
import { GoogleMap, StandaloneSearchBox } from "@react-google-maps/api";

const MapAPI = () => {
  const onLoad = ref => (this.searchBox = ref);

  const onPlacesChanged = () => console.log(this.searchBox.getPlaces());

  return (
    <GoogleMap
      id="circle-example"
      mapContainerStyle={{
        height: "90vh",
        width: "100%"
      }}
      zoom={7}
      center={{
        lat: -3.745,
        lng: -38.523
      }}
    >
      <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
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
      </StandaloneSearchBox>
    </GoogleMap>
  );
};

export default MapAPI;
