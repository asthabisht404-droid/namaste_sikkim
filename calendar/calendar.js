const festivals = [
  // NATIONAL HOLIDAYS
  { date: "2025-01-01", name: "New Year", type: "national", info: "Celebration of the start of the new year.", img: "https://img.icons8.com/color/48/000000/new-year.png" },
  { date: "2025-01-26", name: "Republic Day", type: "national", info: "Commemorates the Constitution of India in 1950.", img: "https://img.icons8.com/color/48/000000/india.png" },
  { date: "2025-08-15", name: "Independence Day", type: "national", info: "Celebration of India's independence from British rule.", img: "https://img.icons8.com/color/48/000000/india.png" },
  { date: "2025-12-25", name: "Christmas", type: "national", info: "Celebration of the birth of Jesus Christ.", img: "https://img.icons8.com/color/48/000000/christmas-star.png" },

  // SIKKIM HOLIDAYS
  { date: "2025-04-14", name: "Buddha Jayanti", type: "sikkim", info: "Celebration of Lord Buddha's birth, enlightenment, and death.", img: "https://img.icons8.com/color/48/000000/buddha.png" },
  { date: "2025-09-16", name: "Sikkim State Day", type: "sikkim", info: "Formation of Sikkim as a state of India in 1975.", img: "https://img.icons8.com/color/48/000000/india.png" },
  { date: "2025-11-14", name: "Losar Festival", type: "sikkim", info: "Tibetan New Year celebrated by Bhutia-Lepcha community.", img: "https://img.icons8.com/color/48/000000/festival.png" },

  // CULTURAL / FESTIVALS
  { date: "2025-03-20", name: "Holi", type: "cultural", info: "Festival of colors, celebrating victory of good over evil.", img: "https://img.icons8.com/color/48/000000/holi-festival.png" },
  { date: "2025-04-14", name: "Baisakhi", type: "cultural", info: "Harvest festival celebrated by Sikhs.", img: "https://img.icons8.com/color/48/000000/festival.png" },
  { date: "2025-10-20", name: "Diwali", type: "cultural", info: "Festival of lights, celebrating light over darkness.", img: "https://img.icons8.com/color/48/000000/diwali.png" },
  { date: "2025-11-01", name: "All Saints Day", type: "cultural", info: "Honoring all saints and martyrs.", img: "https://img.icons8.com/color/48/000000/saint.png" },
  { date: "2025-12-31", name: "New Year's Eve", type: "cultural", info: "Celebration before the new year begins.", img: "https://img.icons8.com/color/48/000000/fireworks.png" },

  // ADDITIONAL SIKKIM FESTIVALS
  { date: "2025-02-25", name: "Tibetan Losar", type: "sikkim", info: "Tibetan Lunar New Year celebrated in Sikkim.", img: "https://img.icons8.com/color/48/000000/festival.png" },
  { date: "2025-05-15", name: "Saga Dawa", type: "sikkim", info: "Celebration of Buddha's enlightenment and death.", img: "https://img.icons8.com/color/48/000000/buddha.png" },
  { date: "2025-07-04", name: "Rongol Festival", type: "sikkim", info: "Annual festival of traditional Sikkimese culture.", img: "https://img.icons8.com/color/48/000000/festival.png" },
  { date: "2025-09-29", name: "Teej Festival", type: "sikkim", info: "Celebrated by Nepali community in Sikkim for marital bliss.", img: "https://img.icons8.com/color/48/000000/festival.png" },
  { date: "2025-11-29", name: "Kagyed Dance", type: "sikkim", info: "Monastic festival performed in monasteries.", img: "https://img.icons8.com/color/48/000000/festival.png" }
];

const calendarEl = document.getElementById("calendar");
const infoEl = document.getElementById("festival-info");
const monthYearEl = document.getElementById("monthYear");
const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");

let currentDate = new Date();

function createCalendar(year, month) {
  calendarEl.innerHTML = "";
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  monthYearEl.textContent = `${year} - ${String(month + 1).padStart(2,'0')}`;

  // Blank cells
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    calendarEl.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");
    cell.classList.add("date-cell");
    const dateStr = `${year}-${String(month + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;

    // Highlight today
    const today = new Date();
    if(today.getFullYear()===year && today.getMonth()===month && today.getDate()===day){
      cell.classList.add("today");
    }

    cell.innerHTML = `<span class="date-number">${day}</span>`;

    const festival = festivals.find(f => f.date === dateStr);
    if(festival){
      cell.classList.add(festival.type);
      cell.addEventListener("mouseover", () => {
        infoEl.innerHTML = `<img src="${festival.img}"/> <strong>${festival.name}</strong> (${festival.type.toUpperCase()})<br>${festival.info}`;
      });
      cell.addEventListener("mouseout", () => {
        infoEl.innerHTML = "Hover over a festival date to see details.";
      });
    }

    calendarEl.appendChild(cell);
  }
}

// Month navigation
prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  createCalendar(currentDate.getFullYear(), currentDate.getMonth());
});
nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  createCalendar(currentDate.getFullYear(), currentDate.getMonth());
});

// Initialize calendar
createCalendar(currentDate.getFullYear(), currentDate.getMonth());
