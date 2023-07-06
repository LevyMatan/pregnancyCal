import {    calculateStartDateFromDueDate,
            calculateStartDateFromLastPeriodDate,
            calculateStartDate,
            calculatePregnancyEvents,
            generateICalContent
        }
        from './pregnancyProgressCalculatorLib.js';

$(document).ready(function() {

    $('#input-option').change(function() {
        const selectedOption = $(this).val();

        // Hide all input fields
        $('.input-fields').hide();

        // Show and enable the input fields for the selected option
        $(`#${selectedOption}-input-fields`).show();

        // Disable the display button
        $('#display-button').prop('disabled', true);
    });

    // Function to check if all required input fields are filled
    function validateInputs() {
      const inputOption = $('#input-option').val();

      if (inputOption === 'date') {
        const date = $('#date-input').val();
        const weekOfPregnancy = parseInt($('#week-input').val());
        const dayOfPregnancy = parseInt($('#day-input').val());

        if (date && weekOfPregnancy && dayOfPregnancy) {
          return true;
        }
      } else if (inputOption === 'last-period') {
        const lastPeriodDate = $('#last-period-input').val();

        if (lastPeriodDate) {
          return true;
        }
      } else if (inputOption === 'due-date') {
        const dueDate = $('#due-date-input').val();

        if (dueDate) {
          return true;
        }
      }

      return false;
    }

    // Event listener for input fields
    $('.input-fields input').on('input', function() {
      if (validateInputs()) {
        $('#display-button').prop('disabled', false); // Enable the display button
        $('#download-ical-button').prop('disabled', false); // Enable the display button
      } else {
        $('#display-button').prop('disabled', true); // Disable the display button
        $('#download-ical-button').prop('disabled', true); // Disable the display button
      }
    });

    // Event listener for display button
    $('#display-button').click(function() {
      const inputOption = $('#input-option').val();
      const resolution = $('#resolution-select').val();

      let startDate;
      if (inputOption === 'date') {
        const date = $('#date-input').val();
        const weekOfPregnancy = parseInt($('#week-input').val());
        const dayOfPregnancy = parseInt($('#day-input').val());
        startDate = calculateStartDate(date, weekOfPregnancy, dayOfPregnancy);
      } else if (inputOption === 'last-period') {
        const lastPeriodDate = $('#last-period-input').val();
        startDate = calculateStartDateFromLastPeriodDate(lastPeriodDate);
      } else if (inputOption === 'due-date') {
        const dueDate = $('#due-date-input').val();
        startDate = calculateStartDateFromDueDate(dueDate);
      }

      const events = calculatePregnancyEvents(startDate, resolution);

        $('#calendar').fullCalendar('destroy');
        $('#calendar').fullCalendar({
            defaultView: 'month',
            defaultDate: startDate.format('YYYY-MM-DD'),
            editable: false,
            eventLimit: true,
            events: events
        });
    });

    // Function to generate the iCal file
    function generateICalFile() {
        // Generate the iCal content
        const iCalContent = generateICalContent();

        // Create a Blob object with the iCal content
        const blob = new Blob([iCalContent], { type: 'text/calendar' });

        // Create a temporary link element
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);

        // Set the link attributes for downloading the iCal file
        link.download = 'calendar.ics';
        link.target = '_blank';

        // Programmatically trigger the click event to download the iCal file
        link.click();
    }
    // Event listener for the "Download iCal" button
    $('#download-ical-button').click(function() {
        generateICalFile();
    });
});
