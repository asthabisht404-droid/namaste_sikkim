document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('festivalCalendar');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    events: [
      { title: 'Losar Festival – Rumtek', start: '2025-02-10' },
      { title: 'Pang Lhabsol – Pemayangtse', start: '2025-08-25' },
      { title: 'Bumchu Festival – Tashiding', start: '2025-03-05' }
    ]
  });
  calendar.render();
});
