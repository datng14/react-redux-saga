import React, { createRef } from "react";
import styled from "styled-components";
import GoogleMapReact from "google-map-react";

const MapContainer = styled.div`
  width: 100%;
  height: 500px;
`;

const SearchBlock = styled.div`
  input {
    width: 400px;
    padding-left: 20px;
  }
`;

const TestMap = props => {
  const searchInput = createRef();
  let searchBox, mapData, mapApi;
  const { lat = 10.7705121, lng = 106.669526, data = [] } = props;

  const center = { lat: parseFloat(lat), lng: parseFloat(lng) };
  const defaultZoom = 13.8;
  const options = {
    fullscreenControl: false,
    zoomControl: false,
    clickableIcons: false
  };

  const apiLoaded = async (map, maps) => {
    searchBox = new maps.places.SearchBox(searchInput.current);
    searchBox.addListener("places_changed", onPlacesChanged);
    mapData = map;
    mapApi = maps;
  };

  const onPlacesChanged = async () => {
    const [{ name = "", geometry: { location } = {} } = {}] =
      searchBox.getPlaces() || [];
    const directionsService = new mapApi.DirectionsService();
    const directionsDisplay = new mapApi.DirectionsRenderer();
    directionsService.route(
      {
        origin: "11 Sư Vạn Hạnh, Phường 12, Quận 10, Hồ Chí Minh, Việt Nam",
        destination: name,
        travelMode: "DRIVING"
      },
      (response, status) => {
        if (status === "OK") {
          directionsDisplay.setDirections(response);
          const routePolyline = new mapApi.Polyline({
            path: response.routes[0].overview_path
          });
          routePolyline.setMap(mapData);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  };

  return (
    <article>
      <MapContainer>
        <SearchBlock>
          <input
            ref={searchInput}
            placeholder="Tìm kiếm"
            className="search-place"
          />
        </SearchBlock>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyCnrNwsnQdNXzD8biY3Lzt5HtjF1vlR0ac",
            language: "vi",
            libraries: ["places"]
          }}
          center={center}
          defaultZoom={defaultZoom}
          options={options}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => apiLoaded(map, maps)}
        >
          {data.map((item, i) => (
            <Location
              key={i}
              lat={get(item, "location.lat", "")}
              lng={get(item, "location.lng", "")}
              src={locationIcon}
            />
          ))}
        </GoogleMapReact>
      </MapContainer>
    </article>
  );
};

export default TestMap;
