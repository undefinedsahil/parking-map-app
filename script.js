// Initialize the map and set initial view to a default zoom level
const map = L.map('map').setView([28.6448, 77.1181], 13); // Initial map center (somewhere near Rajouri Garden, Delhi)

// Add OpenStreetMap tiles (free and public)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
}).addTo(map);

// Locate the user's location
map.locate({ setView: true, maxZoom: 16 });

// Function to handle when the location is found
function onLocationFound(e) {
  // Place the user's marker
  const userMarker = L.marker(e.latlng).addTo(map);
  userMarker.bindPopup("📍 You are here").openPopup();

  // Center map on the user's location
  map.setView(e.latlng, 16); // Zoom into the user's location

  // Sample parking spot data
  const spots = [
    { lat: 28.64889860976805, lng: 77.13277858558044, status: "open" }  // Your given parking spot
  ];

  // Loop through the parking spots and add them to the map
  spots.forEach((spot) => {
    const iconUrl = spot.status === "open"
      ? "https://i.imgur.com/CwNDGoH.png"  // Glowing green dot for open
      : "https://i.imgur.com/LULVkbO.png"; // Glowing red dot for closed

    const icon = L.icon({
      iconUrl: iconUrl,
      iconSize: [35, 35],
      iconAnchor: [17, 34],
    });

    // Add the parking spot marker to the map
    L.marker([spot.lat, spot.lng], { icon: icon }).addTo(map);
  });
}

// Function to handle errors in getting the user's location
function onLocationError(e) {
  alert("Could not get your location. Please ensure location services are enabled.");
}

// Add event listeners to handle location found or error
map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);
