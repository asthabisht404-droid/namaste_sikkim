const monasteries = [
  { name: "Kedarnath Temple", coords: [30.7352, 79.0669], location: "Rudraprayag, Uttarakhand", established: "Ancient", rating: 4.9, sect: "Jyotirlinga - Lord Shiva", tourUrl: "#" },
  { name: "Badrinath Temple", coords: [30.7433, 79.4938], location: "Chamoli, Uttarakhand", established: "Ancient", rating: 4.9, sect: "Lord Vishnu", tourUrl: "#" },
  { name: "Gangotri Temple", coords: [30.9947, 78.9398], location: "Uttarkashi, Uttarakhand", established: "18th Century", rating: 4.8, sect: "Goddess Ganga", tourUrl: "#" },
  { name: "Yamunotri Temple", coords: [31.0140, 78.4600], location: "Uttarkashi, Uttarakhand", established: "Ancient", rating: 4.8, sect: "Goddess Yamuna", tourUrl: "#" },
  { name: "Tungnath Temple", coords: [30.4894, 79.2148], location: "Rudraprayag, Uttarakhand", established: "Highest Shiva Temple", rating: 4.9, sect: "Panch Kedar", tourUrl: "#" },
  { name: "Neelkanth Mahadev", coords: [30.1357, 78.3222], location: "Rishikesh, Uttarakhand", established: "Ancient", rating: 4.8, sect: "Lord Shiva", tourUrl: "#" },
  { name: "Jageshwar Dham", coords: [29.6395, 79.8508], location: "Almora, Uttarakhand", established: "Ancient", rating: 4.7, sect: "Temple Complex", tourUrl: "#" },
  { name: "Mansa Devi Temple", coords: [29.9475, 78.1642], location: "Haridwar, Uttarakhand", established: "Ancient", rating: 4.7, sect: "Shakti Peeth", tourUrl: "#" },
  { name: "Chandi Devi Temple", coords: [29.9525, 78.1770], location: "Haridwar, Uttarakhand", established: "Ancient", rating: 4.7, sect: "Shakti Peeth", tourUrl: "#" },
  { name: "Naina Devi Temple", coords: [29.3803, 79.4636], location: "Nainital, Uttarakhand", established: "Ancient", rating: 4.8, sect: "Shakti Peeth", tourUrl: "#" },
  { name: "Har Ki Pauri", coords: [29.9457, 78.1642], location: "Haridwar, Uttarakhand", established: "Sacred Ghat", rating: 4.9, sect: "Ganga Aarti", tourUrl: "#" },
  { name: "Laxman Jhula", coords: [30.1290, 78.3295], location: "Rishikesh, Uttarakhand", established: "Historic Bridge", rating: 4.8, sect: "Spiritual Site", tourUrl: "#" },
  { name: "Rudranath Temple", coords: [30.5850, 79.3000], location: "Chamoli, Uttarakhand", established: "Ancient", rating: 4.8, sect: "Panch Kedar", tourUrl: "#" },
  { name: "Kalpeshwar Temple", coords: [30.5620, 79.3550], location: "Chamoli, Uttarakhand", established: "Ancient", rating: 4.7, sect: "Panch Kedar", tourUrl: "#" },
  { name: "Auli", coords: [30.5285, 79.5650], location: "Chamoli, Uttarakhand", established: "Ski Destination", rating: 4.8, sect: "Tourism", tourUrl: "#" },
  { name: "Valley of Flowers", coords: [30.7268, 79.6050], location: "Chamoli, Uttarakhand", established: "National Park", rating: 4.9, sect: "UNESCO Site", tourUrl: "#" },
  { name: "Hemkund Sahib", coords: [30.7260, 79.6060], location: "Chamoli, Uttarakhand", established: "Sikh Pilgrimage", rating: 4.9, sect: "Gurudwara", tourUrl: "#" },
  { name: "Mussoorie", coords: [30.4598, 78.0644], location: "Dehradun, Uttarakhand", established: "Hill Station", rating: 4.7, sect: "Tourism", tourUrl: "#" }
];

// Initialize map
const map = L.map('sikkimMap').setView([27.3, 88.5], 9);

// Base layers
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye'
});

// Add layer control
L.control.layers({
  "Street Map": osm,
  "Satellite View": satellite
}).addTo(map);

// Store markers for access later
const monasteryMarkers = {};

// Add markers, tooltips, and popups
monasteries.forEach(m => {
  const marker = L.marker(m.coords).addTo(map);

  // Tooltip on hover
  marker.bindTooltip(`
    <div style="font-size:13px; padding:4px;">
      <b>${m.name}</b><br/>
      📍 ${m.location}<br/>
      🏛 Established: ${m.established}<br/>
      ⭐ Rating: ${m.rating} ★<br/>
      🕉 Sect: ${m.sect}
    </div>
  `, { permanent: false, direction: "top", opacity: 0.9 });

  // Popup on click
  marker.bindPopup(`
    <div style="font-size:14px;">
      <b>${m.name}</b><br/>
      📍 ${m.location}<br/>
      🏛 Established: ${m.established}<br/>
      ⭐ Rating: ${m.rating} ★<br/>
      🕉 Sect: ${m.sect}<br/>
    </div>
  `);

  monasteryMarkers[m.name] = marker;
});

// Focus on monastery when "View on Map" button clicked
function focusOnMonastery(name) {
  const monastery = monasteries.find(m => m.name === name);
  if (monastery) {
    map.setView(monastery.coords, 13);
    const marker = monasteryMarkers[monastery.name];
    if (marker) marker.openPopup();
  }
}
window.focusOnMonastery = focusOnMonastery;

// Fit map to show all monasteries
const allMarkers = monasteries.map(m => L.marker(m.coords));
const group = L.featureGroup(allMarkers);
map.fitBounds(group.getBounds());
