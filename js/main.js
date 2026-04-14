/*console.log("MonasteryNet loaded");

const cardsContainer = document.getElementById('monasteryCards');
if (cardsContainer) {
  cardsContainer.innerHTML = "<p>Loading monasteries...</p>";
}

fetch('http://localhost:3000/api/monasteries')
  .then(response => response.json())
  .then(data => {
    console.log('Monastery data:', data);
    if (cardsContainer && Array.isArray(data)) {
      cardsContainer.innerHTML = data.map(monastery =>
        `<div class="monastery-card">
          <h4>${monastery.name}</h4>
          <p>${monastery.location}</p>
        </div>`
      ).join('');
    }
  })
  .catch(error => {
    console.error('Error fetching monastery data:', error);
    if (cardsContainer) {
      cardsContainer.innerHTML = "<p>Failed to load monasteries.</p>";
    }
  });*/
  // Example React: App.js
import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/test")
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error(err));
  }, []);

  return <div>{message}</div>;
}

export default App;
