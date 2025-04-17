// Initialize the map
const map = L.map('map').fitWorld();

// Add OpenStreetMap tiles (free and public)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
}).addTo(map);

// Locate user
map.locate({ setView: true, maxZoom: 16 });

// What happens when location is found
function onLocationFound(e) {
  const userMarker = L.marker(e.latlng).addTo(map);
  userMarker.bindPopup("📍 You are here").openPopup();

  // Sample nearby parking spots (just some dummy data near your location)
  const spots = [
    { lat: e.latitude + 28.64889518294793, lng: e.longitude + 77.13278908093223, status: "open" },
    { lat: e.latitude - 0.001, lng: e.longitude - 0.001, status: "closed" },
    { lat: e.latitude + 0.0015, lng: e.longitude - 0.0008, status: "open" },
    { lat: e.latitude - 0.0015, lng: e.longitude + 0.0008, status: "closed" }
  ];

  spots.forEach((spot) => {
    const iconUrl = spot.status === "open"
      ? "https://i.imgur.com/CwNDGoH.png"  // Glowing green dot
      : "https://i.imgur.com/LULVkbO.png"; // Glowing red dot

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
