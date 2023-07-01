document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('pregnancy-form');
  const calendarContainer = document.getElementById('calendar-container');
  const downloadLink = document.getElementById('download-link');
  const successMessage = document.getElementById('success-message');

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    generateICal();
  });

  function generateICal() {
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

    const calendarContent = cal.download();
    calendarContainer.innerHTML = calendarContent;
    calendarContainer.style.display = 'block';

    const filename = 'pregnancy_schedule.ics';
    const blob = new Blob([calendarContent], { type: 'text/calendar;charset=utf-8' });
    const downloadUrl = URL.createObjectURL(blob);
    downloadLink.href = downloadUrl;
    downloadLink.setAttribute('download', filename);
    downloadLink.style.display = 'block';

    successMessage.textContent = 'iCal file generated successfully.';
  }
});
