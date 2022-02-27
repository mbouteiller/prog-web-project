import './Map.css';

import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-markercluster';

import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import L from 'leaflet';
import PopupFuel from "./popup/PopupFuel";
import PopupSchedule from "./popup/PopupSchedule";

const customMarker = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40]
});

const customMarkerMyPosition = new L.Icon({
    iconUrl: "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF",
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40]
});

function Map({stations, position}) {

  return (
    <MapContainer center={[43.773644112573116, 6.546820326950372]} zoom={6}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup disableClusteringAtZoom={13}>
        {stations.map((value, index) => (
          <Marker position={[value.latitude, value.longitude]} icon={customMarker} key={index}>
              <Popup className="popup">
                  <span style={{fontWeight: "bold", fontSize: "1.4em"}}>{value.address === undefined ? value.ville : value.address}</span>
                  <div style={{display: "flex", flexDirection: "row", width: 'max-content'}}>
                      <PopupFuel price={value.prix} rupture={value.rupture}/>
                      <PopupSchedule schedule={value.horaires}/>
                  </div>
              </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
        <Marker position={[position.latitude, position.longitude]} icon={customMarkerMyPosition}>
            <Popup>
                Ceci est votre position !
            </Popup>
        </Marker>
    </MapContainer>
  );
}

export default Map;
