document.addEventListener('DOMContentLoaded', function() {
    // Hide all field groups initially
    document.getElementById('last-period-fields').style.display = 'none';
    document.getElementById('progress-fields').style.display = 'none';
    document.getElementById('due-date-fields').style.display = 'none';

    // Show relevant field group based on selected method
    document.getElementById('method').addEventListener('change', function() {
        var selectedMethod = this.value;
        var lastPeriodFields = document.getElementById('last-period-fields');
        var progressFields = document.getElementById('progress-fields');
        var dueDateFields = document.getElementById('due-date-fields');

        // Hide all field groups
        lastPeriodFields.style.display = 'none';
        progressFields.style.display = 'none';
        dueDateFields.style.display = 'none';

        // Show the relevant field group based on selected method
        if (selectedMethod === 'last-period') {
            lastPeriodFields.style.display = 'block';
        } else if (selectedMethod === 'progress') {
            progressFields.style.display = 'block';
        } else if (selectedMethod === 'due-date') {
            dueDateFields.style.display = 'block';
        }
    });

    document.getElementById('pregnancy-form').addEventListener('submit', function(event) {
        event.preventDefault();

        var selectedMethod = document.getElementById('method').value;
        var eventDuration = parseInt(document.getElementById('event-duration').value);
        var startDate, pregnancyWeeks, pregnancyDays;

        if (selectedMethod === 'last-period') {
            startDate = new Date(document.getElementById('last-period').value);
            pregnancyWeeks = 40;
            pregnancyDays = 0;
        } else if (selectedMethod === 'progress') {
            startDate = new Date(document.getElementById('progress-date').value);
            pregnancyWeeks = parseInt(document.getElementById('pregnancy-weeks').value);
            pregnancyDays = parseInt(document.getElementById('pregnancy-days').value);
        } else if (selectedMethod === 'due-date') {
            var dueDate = new Date(document.getElementById('due-date').value);
            var daysDifference = Math.round((dueDate - Date.now()) / (1000 * 60 * 60 * 24));
            pregnancyWeeks = Math.floor(daysDifference / 7);
            pregnancyDays = daysDifference % 7;
            startDate = new Date();
            startDate.setDate(startDate.getDate() - (40 * 7)); // Subtract 40 weeks to approximate the start date
        }

        // Generate the iCal file
        var cal = ics();
        var currentDate = new Date(startDate);
        for (var week = 1; week <= pregnancyWeeks; week++) {
            for (var day = 1; day <= eventDuration; day++) {
                if (week === pregnancyWeeks && day > pregnancyDays) {
                    break;
                }
                var eventDate = new Date(currentDate);
                eventDate.setDate(eventDate.getDate() + (day - 1));
                var eventEndDate = new Date(eventDate);
                eventEndDate.setDate(eventEndDate.getDate() + 1);
                var eventSummary = (eventDuration === 7) ? `Week ${week} of Pregnancy` : `Week ${week}, Day ${day} of Pregnancy`;
                cal.addEvent('Pregnancy', eventSummary, '', eventDate, eventEndDate);
            }
            currentDate.setDate(currentDate.getDate() + (eventDuration - 1));
        }

        // Download the iCal file
        cal.download('pregnancy_schedule');
    });
});
