import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPinIcon } from 'lucide-react';

const LocationMap = ({ onLocationSelect }) => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      const defaultPosition = [51.505, -0.09];

      mapRef.current = L.map(mapContainerRef.current).setView(defaultPosition, 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      const customIcon = L.divIcon({
        html: `
          <div class="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="10" r="3"/>
              <path d="M12 2a8 8 0 0 0-8 8c0 1.892.402 3.13 1.5 4.5L12 22l6.5-7.5c1.098-1.37 1.5-2.608 1.5-4.5a8 8 0 0 0-8-8z"/>
            </svg>
          </div>`,
        className: 'custom-marker-icon',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });

      mapRef.current.on('click', (e) => {
        const { lat, lng } = e.latlng;

        if (markerRef.current) {
          mapRef.current.removeLayer(markerRef.current);
        }

        markerRef.current = L.marker([lat, lng], { icon: customIcon }).addTo(mapRef.current);

        const mockAddress = `Location at ${lat.toFixed(5)}, ${lng.toFixed(5)}`;

        onLocationSelect({
          lat,
          lng,
          address: mockAddress,
        });
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [onLocationSelect]);

  return (
    <div className="relative">
      <div ref={mapContainerRef} className="h-[300px] w-full"></div>
      <div className="absolute bottom-2 left-2 bg-white p-2 rounded shadow-md text-xs">
        <div className="flex items-center text-gray-700">
          <MapPinIcon size={14} className="mr-1 text-blue-600" />
          <span>Click on the map to select delivery location</span>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;
