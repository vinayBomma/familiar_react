import { Box } from "@material-ui/core";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl:
    "https://lh3.googleusercontent.com/a-/AOh14GgSL9H-4yXSZcWrfQ3XKMBQZaqN70s6PR0mhkW8Zw=s96-c",
  iconSize: [40, 40],
});

const Map = () => {
  const position = [19.0010232, 72.8397202];
  return (
    // <div style={{ height: "80vh", width: "80vh" , backgroundColor: "green" }}>
    <Box mx={6} mt={3}>
      <MapContainer
        style={{ height: "80vh" }}
        center={position}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} icon={markerIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Marker position={[19.0462548, 72.8741196]} icon={markerIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </Box>
    // </div>
  );
};

export default Map;
