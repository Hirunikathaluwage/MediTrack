import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const DeliveryMap = ({ delivery }) => {
  useEffect(() => {
    if (!delivery?.location?.lat || !delivery?.location?.lng) {
      console.error('No valid location for this delivery.');
      return;
    }

    const map = L.map('map').setView(
      [delivery.location.lat, delivery.location.lng],
      13
    );

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Marker for delivery destination
    const deliveryIcon = L.icon({
      iconUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    L.marker([delivery.location.lat, delivery.location.lng], {
      icon: deliveryIcon,
    })
      .addTo(map)
      .bindPopup(`<b>${delivery.customerName}</b><br>${delivery.address}`)
      .openPopup();

    // Driver simulated location (a little away for testing)
    const driverLocation = {
      lat: delivery.location.lat - 0.01,
      lng: delivery.location.lng - 0.01,
    };

    const driverIcon = L.icon({
      iconUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    L.marker([driverLocation.lat, driverLocation.lng], {
      icon: driverIcon,
    })
      .addTo(map)
      .bindPopup('Your Current Location');

    // Draw route
    const routePoints = [
      [driverLocation.lat, driverLocation.lng],
      [delivery.location.lat, delivery.location.lng],
    ];

    L.polyline(routePoints, {
      color: 'blue',
      weight: 3,
      opacity: 0.7,
    }).addTo(map);

    map.fitBounds(L.latLngBounds(routePoints));

    return () => {
      map.remove();
    };
  }, [delivery]);

  return (
    <div
      id="map"
      style={{
        height: '100%',
        width: '100%',
      }}
    />
  );
};

export default DeliveryMap;
