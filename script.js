import {    calculateStartDateFromDueDate,
            calculateStartDateFromLastPeriodDate,
            calculateStartDate,
            calculatePregnancyEvents,
            generateICal
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

    function getStartDateAndResolution() {
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

        return {startDate, resolution};
    }

    // Event listener for display button
    $('#display-button').click(function() {

        $('#input-section').addClass('hide-instructions');
        const input = getStartDateAndResolution();
        const startDate = input.startDate;
        const resolution = input.resolution;
        const events = calculatePregnancyEvents(startDate, resolution);

        $('#calendar').fullCalendar('destroy');
        $('#calendar').fullCalendar({
            defaultView: 'month',
            defaultDate: startDate.format('YYYY-MM-DD'),
            editable: false,
            eventLimit: true,
            events: events
        });
        // Scroll to the calendar section
        $('html, body').animate({
            scrollTop: $('#calendar').offset().top
        }, 1000);
    });

    // Event listener for the "Download iCal" button
    $('#download-ical-button').click(function() {
        // Get the start date and resolution
        const input = getStartDateAndResolution();
        const startDate = input.startDate;
        const resolution = input.resolution;
        // Generate the iCal object
        const cal = generateICal(startDate, resolution);
        // Download the iCal file
        cal.download("Pregnancy Progress Calendar");
    });
});
