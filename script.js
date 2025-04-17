// Initialize the map and set the default view to somewhere in Delhi (Rajouri Garden area).
const map = L.map('map').setView([28.6448, 77.1181], 13); // Initial map center (near Rajouri Garden, Delhi)

// Add OpenStreetMap tiles (free and public)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
}).addTo(map);

// Variable to keep track of the user's marker
let userMarker = null;  // Will hold the marker object

// Function to locate and center the map to the user's location
function locateUser() {
  map.locate({ setView: true, maxZoom: 16 });
}

// Handle when the location is found
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
      ? "https://i.imgur.com/CwNDGoH.png"  // Glowing green dot for open
      : "https://i.imgur.com/LULVkbO.png"; // Glowing red dot for closed

    const icon = L.icon({
      iconUrl: iconUrl,
      iconSize: [35, 35],
      iconAnchor: [17, 34],
    });

    // Add the parking spot marker
    L.marker([spot.lat, spot.lng], { icon: icon }).addTo(map);
  });
}

// Handle errors when the location can't be found
function onLocationError(e) {
  alert("Could not get your location. Please make sure location services are enabled.");
}

// Add event listeners for location found and errors
map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

// Automatically locate the user when the map loads
map.locate({ setView: true, maxZoom: 16 });

// Create the recenter button and add it to the map
const recenterButton = L.control({ position: 'bottomright' });

recenterButton.onAdd = function() {
  const div = L.DomUtil.create('div', 'recenter-btn');
  div.innerHTML = '<button>Recenter</button>';
  div.className = 'recenter-btn-container';

  div.onclick = function() {
    locateUser(); // Re-center the map when clicked
  };

  return div;
};

// Add the recenter button to the map
recenterButton.addTo(map);
