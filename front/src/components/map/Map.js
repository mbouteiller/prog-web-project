import './Map.css';

import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const customMarker = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40]
});

function Map({stations}) {

  return (
    <MapContainer center={[43.773644112573116, 6.546820326950372]} zoom={6}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {stations.map((value, index) => (
        <Marker position={[value.latitude, value.longitude]} icon={customMarker} key={index}>
          <Popup>
            {index + 1} is for popup with lat: {value.latitude} and lon {value.longitude}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
