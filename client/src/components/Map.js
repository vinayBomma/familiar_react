import { Box } from "@material-ui/core";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useQuery, useMutation, gql } from "@apollo/client";
import L from "leaflet";
import { useState } from "react";

const GET_USERS = gql`
  query users($id: String!) {
    users(id: $id) {
      displayName
      location
      batteryLevel
      avatar
      _id
    }
  }
`;

const Map = (groupID) => {
  const position = [19.0010232, 72.8397202];
  console.log(groupID)
  const [iconMarker, setIconMarker] = useState(
    "https://lh3.googleusercontent.com/a-/AOh14GgSL9H-4yXSZcWrfQ3XKMBQZaqN70s6PR0mhkW8Zw=s96-c"
  );

  const { loading, error, data } = useQuery(GET_USERS, {
    variables: {
      id: groupID.group,
    },
  });

  const markerIcon = new L.Icon({
    iconUrl: iconMarker,
    iconSize: [40, 40],
  });

  console.log(data)
  
  return (
    <Box mx={6} mt={3}>
      <MapContainer
        style={{ height: "80vh" }}
        center={position}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {loading ? (
          <p>Loading...</p>
        ) : (
          data.users.map((user) => (
            <Marker
              key={user._id}
              position={[
                user.location[user.location.length - 2],
                user.location[user.location.length - 1],
              ]}
              position={position}
              icon={markerIcon}
            >
              <Popup>
                {user.batteryLevel}
                <br /> {user.displayName}
              </Popup>
            </Marker>
            // <Marker position={[19.0462548, 72.8741196]} icon={markerIcon}>
            //   <Popup>
            //     A pretty CSS3 popup. <br /> Easily customizable.
            //   </Popup>
            // </Marker>
          ))
        )}
      </MapContainer>
    </Box>
  );
};

export default Map;
