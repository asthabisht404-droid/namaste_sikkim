const monasteries = [
  { name: "Rumtek Monastery", coords: [27.333, 88.620], location: "East Sikkim", established: "1740", rating: 4.8, sect: "Kagyü Sect", tourUrl: "#" },
  { name: "Pemayangtse Monastery", coords: [27.250, 88.250], location: "West Sikkim", established: "1705", rating: 4.7, sect: "Nyingma Sect", tourUrl: "#" },
  { name: "Tashiding Monastery", coords: [27.200, 88.300], location: "West Sikkim", established: "1717", rating: 4.6, sect: "Nyingma Sect", tourUrl: "#" },
  { name: "Enchey Monastery", coords: [27.330, 88.616], location: "Gangtok, East Sikkim", established: "1909", rating: 4.5, sect: "Nyingma Sect", tourUrl: "#" },
  { name: "Phodong Monastery", coords: [27.425, 88.530], location: "North Sikkim", established: "1718", rating: 4.6, sect: "Kagyü Sect", tourUrl: "#" },
  { name: "Ralong Monastery", coords: [27.140, 88.170], location: "South Sikkim", established: "1690", rating: 4.4, sect: "Kagyü Sect", tourUrl: "#" },
  { name: "Sanga Choeling Monastery", coords: [27.316, 88.266], location: "West Sikkim", established: "1697", rating: 4.7, sect: "Nyingma Sect", tourUrl: "#" },
  { name: "Tsomgo Monastery", coords: [27.330, 88.550], location: "East Sikkim", established: "1900", rating: 4.3, sect: "Buddhist", tourUrl: "#" },
  { name: "Phensang Monastery", coords: [27.413, 88.566], location: "North Sikkim", established: "1721", rating: 4.5, sect: "Nyingma Sect", tourUrl: "#" },
  { name: "Lachung Monastery", coords: [27.690, 88.741], location: "North Sikkim", established: "1880", rating: 4.4, sect: "Nyingma Sect", tourUrl: "#" },
  { name: "Lingdum (Ranka) Monastery", coords: [27.354, 88.695], location: "East Sikkim", established: "1998", rating: 4.7, sect: "Zurman Kagyu Sect", tourUrl: "#" },
  { name: "Dubdi Monastery", coords: [27.333, 88.233], location: "West Sikkim (Yuksom)", established: "1701", rating: 4.6, sect: "Nyingma Sect", tourUrl: "#" },
  { name: "Kartok Monastery", coords: [27.301, 88.236], location: "Yuksom, West Sikkim", established: "18th Century", rating: 4.3, sect: "Nyingma Sect", tourUrl: "#" },
  { name: "Zong Dog Palri Fo Brang Monastery", coords: [27.043, 88.266], location: "Kalimpong (Near Sikkim)", established: "1976", rating: 4.5, sect: "Buddhist", tourUrl: "#" },
  { name: "Ngadak Monastery", coords: [27.296, 88.273], location: "Namchi, South Sikkim", established: "17th Century", rating: 4.2, sect: "Nyingma Sect", tourUrl: "#" },
  { name: "Tholung Monastery", coords: [27.707, 88.545], location: "Dzongu, North Sikkim", established: "1789", rating: 4.4, sect: "Nyingma Sect", tourUrl: "#" },

  // Newly added monasteries
  { name: "Lingdum Monastery", coords: [27.354, 88.695], location: "Near Ranka, East Sikkim", established: "1998", rating: 4.7, sect: "Zurman Kagyu Sect", tourUrl: "#" },
  { name: "Tashilhunpo Monastery", coords: [27.170, 88.880], location: "Shigatse, Tibet", established: "1447", rating: 4.8, sect: "Gelugpa Sect", tourUrl: "#" },
  { name: "Lachung Monastery", coords: [27.690, 88.741], location: "North Sikkim", established: "1880", rating: 4.4, sect: "Nyingma Sect", tourUrl: "#" },
  { name: "Phensang Monastery", coords: [27.413, 88.566], location: "North Sikkim", established: "1721", rating: 4.5, sect: "Nyingma Sect", tourUrl: "#" },
  { name: "Sanga Choeling Monastery", coords: [27.316, 88.266], location: "West Sikkim", established: "1697", rating: 4.7, sect: "Nyingma Sect", tourUrl: "#" },
  { name: "Ralong Monastery", coords: [27.140, 88.170], location: "South Sikkim", established: "1690", rating: 4.4, sect: "Kagyü Sect", tourUrl: "#" },
  { name: "Lingdum Ranka Monastery", coords: [27.354, 88.695], location: "East Sikkim", established: "1998", rating: 4.7, sect: "Zurman Kagyu Sect", tourUrl: "#" },
  { name: "Ngadak Monastery", coords: [27.296, 88.273], location: "Namchi, South Sikkim", established: "17th Century", rating: 4.2, sect: "Nyingma Sect", tourUrl: "#" }
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
