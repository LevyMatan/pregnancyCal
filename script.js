$(document).ready(function() {
    $('#input-option').change(function() {
      const selectedOption = $(this).val();
      $('.input-fields').hide();
      $(`#${selectedOption}-input-fields`).show();
      $('#display-button').prop('disabled', true); // Disable the display button
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
});

/**
 *
 * @param {*} dueDate
 * @returns
 */
function calculateStartDateFromDueDate(dueDate) {
    return moment(dueDate).subtract(40, 'weeks');
}

function calculateStartDateFromLastPeriodDate(lastPeriodDate) {
    return moment(lastPeriodDate).add(1, 'day');
}

function calculateStartDate(date, weekOfPregnancy, dayOfPregnancy) {
    return moment(date).subtract(weekOfPregnancy - 1, 'weeks').subtract(dayOfPregnancy - 1, 'days');
}

function calculatePregnancyEvents(startDate, resolution) {
    const currentDate = moment();
    const events = [];

    for (let i = 1; i <= 40; i++) {
        let eventStart, eventEnd;

        if (resolution === 'day') {
            for (let day = 1; day <= 7; day++) {
                eventStart = startDate.clone().add((i - 1) * 7 + (day - 1), 'days');
                eventEnd = eventStart.clone().add(1, 'days');

                const event = {
                    title: `Week ${i} - Day ${day}`,
                    start: eventStart.format('YYYY-MM-DD'),
                    end: eventEnd.format('YYYY-MM-DD')
                };

                if (currentDate.isBetween(eventStart, eventEnd, 'day', '[]')) {
                    event.color = 'red';
                }

                events.push(event);
            }
        } else {
            eventStart = startDate.clone().add((i - 1) * 7, 'days');
            eventEnd = eventStart.clone().add(7, 'days');

            const event = {
                title: `Week ${i}`,
                start: eventStart.format('YYYY-MM-DD'),
                end: eventEnd.format('YYYY-MM-DD')
            };

            if (currentDate.isBetween(eventStart, eventEnd, 'day', '[]')) {
                event.color = 'red';
            }

            events.push(event);
        }
    }

    return events;
}
