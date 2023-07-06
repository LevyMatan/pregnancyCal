import PregnancyProgressCalculator from './pregnancyProgressCalculatorLib.js';


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
      } else {
        $('#display-button').prop('disabled', true); // Disable the display button
      }
    });

    $('#display-button').click(function() {
      const inputOption = $('#input-option').val();
      const resolution = $('#resolution-select').val();

      let startDate;
      if (inputOption === 'date') {
        const date = $('#date-input').val();
        const weekOfPregnancy = parseInt($('#week-input').val());
        const dayOfPregnancy = parseInt($('#day-input').val());
        startDate = PregnancyProgressCalculator.calculateStartDate(date, weekOfPregnancy, dayOfPregnancy);
      } else if (inputOption === 'last-period') {
        const lastPeriodDate = $('#last-period-input').val();
        startDate = PregnancyProgressCalculator.calculateStartDateFromLastPeriodDate(lastPeriodDate);
      } else if (inputOption === 'due-date') {
        const dueDate = $('#due-date-input').val();
        startDate = PregnancyProgressCalculator.calculateStartDateFromDueDate(dueDate);
      }

      const events = PregnancyProgressCalculator.calculatePregnancyEvents(startDate, resolution);

        $('#calendar').fullCalendar('destroy');
        $('#calendar').fullCalendar({
            defaultView: 'month',
            defaultDate: startDate.format('YYYY-MM-DD'),
            editable: false,
            eventLimit: true,
            events: events
        });
    });
});
