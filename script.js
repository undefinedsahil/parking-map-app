// Function to locate and center the map to the user's location
function onLocationFound(e) {
  // If there was already a user marker, remove it
  if (userMarker) {
    map.removeLayer(userMarker);
  }

  // Place a marker for the user's current location
  userMarker = L.marker(e.latlng).addTo(map);
  userMarker.bindPopup("📍 You are here").openPopup();

  // Center map to the user's location
  map.setView(e.latlng, 16);  // Zoom to user's location

  // Sample parking spot data with your given coordinates
  const spots = [
    { lat: 28.64889860976805, lng: 77.13277858558044, status: "open" }  // Your parking spot
  ];

  // Loop through parking spots and place markers
  spots.forEach((spot) => {
    const iconUrl = spot.status === "open"
      ? "images/open-parking.png.png"  // Glowing green dot for open
      : "images/closed-parking.png.png"; // Glowing red dot for closed

    const icon = L.icon({
      iconUrl: iconUrl,
      iconSize: [35, 35],
      iconAnchor: [17, 34],
    });

    // Add the parking spot marker
    L.marker([spot.lat, spot.lng], { icon: icon }).addTo(map);
  });
}
