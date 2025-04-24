import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const DeliveryMap = ({ delivery }) => {
  useEffect(() => {
    // Create map instance
    const map = L.map('map').setView(
      [delivery.coordinates.lat, delivery.coordinates.lng],
      13
    );

    // Add the OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Delivery location marker
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

    L.marker([delivery.coordinates.lat, delivery.coordinates.lng], {
      icon: deliveryIcon,
    })
      .addTo(map)
      .bindPopup(
        `<b>${delivery.customerName}</b><br>${delivery.address}`
      )
      .openPopup();

    // Driver current location (simulated)
    const driverLocation = {
      lat: delivery.coordinates.lat - 0.01,
      lng: delivery.coordinates.lng - 0.01,
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
      .bindPopup('Your current location');

    // Route line between driver and delivery
    const routePoints = [
      [driverLocation.lat, driverLocation.lng],
      [delivery.coordinates.lat, delivery.coordinates.lng],
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
