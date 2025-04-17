const map = L.map('map').fitWorld();

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
}).addTo(map);

map.locate({ setView: true, maxZoom: 16 });

function onLocationFound(e) {
  const userMarker = L.marker(e.latlng).addTo(map);
  userMarker.bindPopup("📍 You are here").openPopup();

  // Example parking spots
  const spots = [
    { lat: e.latitude + 0.001, lng: e.longitude + 0.001, status: "open" },
    { lat: e.latitude - 0.001, lng: e.longitude - 0.001, status: "closed" },
  ];

  spots.forEach((spot) => {
    const iconUrl = spot.status === "open"
      ? "https://i.imgur.com/CwNDGoH.png"
      : "https://i.imgur.com/LULVkbO.png";

    const icon = L.icon({
      iconUrl: iconUrl,
      iconSize: [35, 35],
      iconAnchor: [17, 34],
    });

    L.marker([spot.lat, spot.lng], { icon: icon }).addTo(map);
  });
}

function onLocationError(e) {
  alert("Could not get your location");
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);
