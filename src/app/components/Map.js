// MapComponent.jsx
"use client"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const MapComponent = () => {
  const lakeTanaPosition = [12.0000, 37.2500]; // Latitude, Longitude

  // Create custom icon
  const customIcon = new L.Icon({
    iconUrl: '/custom-.png', // Path to your custom image
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
    // shadowUrl: '/custom-marker-shadow.png', // Optional: Add if you want a shadow
    // shadowSize: [41, 41], // Shadow size
    // shadowAnchor: [12, 41], // Shadow anchor point
  });

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
      </MapContainer>
    </div>
  );
};

export default MapComponent;