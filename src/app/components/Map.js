// MapComponent.jsx
"use client"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapComponent = () => {
  const lakeTanaPosition = [12.0000, 37.2500]; // Latitude, Longitude

  return (
    <div className='mx-24'>

    <MapContainer
  center={lakeTanaPosition}
  zoom={10}
  scrollWheelZoom={false}
  dragging={true}
  doubleClickZoom={true}
  touchZoom={true}
  style={{ height: '500px', width: '100%' }}
>

      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={lakeTanaPosition}>
        <Popup>
          Lake Tana – Source of the Blue Nile
        </Popup>
      </Marker>
    </MapContainer>
    </div>
  );
};

export default MapComponent;
