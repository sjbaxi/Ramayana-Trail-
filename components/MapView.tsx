
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { TRAIL_STOPS } from '../constants'; // Assuming TRAIL_STOPS has lat/lng data

interface MapViewProps {
  onSelectStop: (stopName: string) => void;
}

// Custom icon for the markers (optional, using default for now to keep it simple)
// const customIcon = new L.Icon({
//   iconUrl: 'https://cdn-icons-png.flaticon.com/512/3850/3850388.png', // Example icon
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
//   shadowSize: [41, 41]
// });

// Extend TrailStop to include geographical coordinates
interface TrailStopWithCoords extends L.LatLngExpression {
  id: string;
  name: string;
  region: string;
  highlights: string[];
  description: string;
  lat: number;
  lng: number;
}

// Placeholder for adding coordinates to TRAIL_STOPS
// In a real app, this data would come from an API or a more structured source.
const TRAIL_STOPS_WITH_COORDS: TrailStopWithCoords[] = TRAIL_STOPS.map(stop => {
  let lat: number;
  let lng: number;

  switch (stop.id) {
    case 'ayodhya':
      lat = 26.7924; lng = 82.1974; // Uttar Pradesh, India
      break;
    case 'mithila':
      lat = 26.5684; lng = 85.9221; // Janakpur, Nepal (Mithila Region)
      break;
    case 'chitrakoot':
      lat = 25.1764; lng = 80.8524; // Madhya Pradesh, India
      break;
    case 'dandakaranya':
      lat = 20.0; lng = 81.0; // Central India (approximate center of region)
      break;
    case 'panchvati':
      lat = 19.9975; lng = 73.7898; // Nashik, Maharashtra, India
      break;
    case 'kishkindha':
      lat = 15.3350; lng = 76.4600; // Hampi (near Anegundi), Karnataka, India
      break;
    case 'rameswaram':
      lat = 9.2882; lng = 79.3175; // Tamil Nadu, India
      break;
    case 'lanka':
      lat = 7.8731; lng = 80.7718; // Central Sri Lanka (general area)
      break;
    default:
      lat = 20.5937; lng = 78.9629; // Center of India as fallback
  }
  return { ...stop, lat, lng };
});

const MapView: React.FC<MapViewProps> = ({ onSelectStop }) => {
  // Center map to encompass most of the trail (e.g., central India/Sri Lanka)
  // A good initial zoom level to see India and Sri Lanka
  const initialCenter: L.LatLngExpression = [20.5937, 78.9629]; 
  const initialZoom = 5;

  return (
    <MapContainer 
      center={initialCenter} 
      zoom={initialZoom} 
      scrollWheelZoom={true} 
      className="h-full w-full"
      aria-label="Ramayana Trail Map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {TRAIL_STOPS_WITH_COORDS.map((stop) => (
        <Marker 
          key={stop.id} 
          position={[stop.lat, stop.lng]} 
          // icon={customIcon} // Use if you have a custom icon
          aria-label={`Marker for ${stop.name}`}
        >
          <Popup>
            <div className="font-inter text-gray-800">
              <h4 className="font-playfair-display text-base font-semibold text-amber-900 mb-1">{stop.name}</h4>
              <p className="text-sm text-gray-700 mb-2">{stop.description}</p>
              <button
                onClick={() => onSelectStop(`Tell me more about ${stop.name} in the Ramayana Trail.`)}
                className="saffron-gradient text-white text-xs px-3 py-1.5 rounded-lg shadow-md hover:shadow-lg transition-all"
                aria-label={`Chat about ${stop.name}`}
              >
                Chat about this stop
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
