document.addEventListener('DOMContentLoaded', function() {

    // Check if ics library is available
    if (typeof ics !== 'undefined') {
        // Code to execute when the ics library is available

        // Get form element and attach submit event listener
        const form = document.getElementById('pregnancy-form');
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            // Get selected method
            const methodSelect = document.getElementById('method');
            const selectedMethod = methodSelect.value;

            // Get input values based on selected method
            let startDate;
            let pregnancyWeeks;
            let pregnancyDays;

            if (selectedMethod === 'last-period') {
                const lastPeriodInput = document.getElementById('last-period');
                startDate = new Date(lastPeriodInput.value);
            } else if (selectedMethod === 'progress') {
                const progressDateInput = document.getElementById('progress-date');
                startDate = new Date(progressDateInput.value);

                const pregnancyWeeksInput = document.getElementById('pregnancy-weeks');
                const pregnancyDaysInput = document.getElementById('pregnancy-days');
                pregnancyWeeks = parseInt(pregnancyWeeksInput.value);
                pregnancyDays = parseInt(pregnancyDaysInput.value);
            } else if (selectedMethod === 'due-date') {
                const dueDateInput = document.getElementById('due-date');
                startDate = new Date(dueDateInput.value);
            }

            // Get event duration
            const eventDurationSelect = document.getElementById('event-duration');
            const eventDuration = parseInt(eventDurationSelect.value);

            // Generate iCal events
            const events = generatePregnancyEvents(startDate, pregnancyWeeks, pregnancyDays, eventDuration);

            // Generate iCal file
            const { error, value } = ics.createEvents(events);

            if (error) {
                console.error(error);
                return;
            }

            // Create a blob from the iCal data
            const blob = new Blob([value], { type: 'text/calendar' });

            // Create a download link and trigger the download
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'pregnancy_schedule.ics';
            link.click();

            // Display success message
            const successMessage = document.getElementById('success-message');
            successMessage.style.display = 'block';
            successMessage.textContent = 'iCal file generated successfully!';
        });
    } else {
        // Code to execute when the ics library is not available

        // Display error message
        const errorMessage = document.getElementById('success-message');
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Unable to generate iCal file. Please try again later.';
        console.log('ics library is NOT available');

        // Fallback to ical.js
        loadIcalLibrary();
    }
});

function loadIcalLibrary() {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/ical.js/4.8.0/ical.js';
    script.onload = function() {
      console.log('ical.js library has been loaded');
      // Code to execute when the ical.js library is loaded

      // Rest of your code goes here...
    };
    script.onerror = function() {
      console.log('Failed to load ical.js library');
      // Display error message
      const errorMessage = document.getElementById('success-message');
      errorMessage.style.display = 'block';
      errorMessage.textContent = 'Unable to generate iCal file. Please try again later.';
    };
    document.head.appendChild(script);
}
