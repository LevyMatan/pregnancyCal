document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('pregnancy-form');
  const calendarContainer = document.getElementById('calendar-container');
  const downloadButton = document.getElementById('download-button');

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    generateCalendar();
  });

  function generateCalendar() {
    const startDate = document.getElementById('start-date').value;
    const pregnancyWeeks = parseInt(document.getElementById('pregnancy-weeks').value);
    const pregnancyDays = parseInt(document.getElementById('pregnancy-days').value);
    const eventDuration = parseInt(document.getElementById('event-duration').value);

    const cal = ics();

    let currentDate = new Date(startDate);

    for (let week = 1; week <= pregnancyWeeks; week++) {
      for (let day = 1; day <= pregnancyDays; day++) {
        const endDate = new Date(currentDate.getTime() + (eventDuration - 1) * 24 * 60 * 60 * 1000);

        cal.addEvent(`Week ${week} - Day ${day}`, '', '', currentDate, endDate);

        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    const calendarContent = cal.calendar();
    calendarContainer.innerHTML = calendarContent;
    calendarContainer.style.display = 'block';

    downloadButton.style.display = 'block';
    downloadButton.addEventListener('click', function() {
      const filename = 'pregnancy_schedule.ics';
      const blob = new Blob([calendarContent], { type: 'text/calendar;charset=utf-8' });
      saveAs(blob, filename);
    });
  }
});
