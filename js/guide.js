// guide.js

// Handle guide application form
const form = document.getElementById("guideApplicationForm");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = {
      name: form.name.value,
      email: form.email.value,
      region: form.region.value,
      reason: form.reason.value,
      submittedAt: new Date().toISOString()
    };

    // Simulate saving to applications.json
    console.log("Application submitted:", data);

    form.classList.add("hidden");
    document.getElementById("confirmationMessage").classList.remove("hidden");
  });
}

// Populate booking list in guide-profile.html
const bookingList = document.getElementById("bookingList");
if (bookingList) {
  const bookings = [
    { tourist: "John Doe", monastery: "Rumtek", date: "Sept 5" },
    { tourist: "Priya Sharma", monastery: "Tashiding", date: "Sept 12" }
  ];

  bookings.forEach(b => {
    const li = document.createElement("li");
    li.textContent = `${b.tourist} – ${b.monastery} – ${b.date}`;
    bookingList.appendChild(li);
  });
}
