$(document).ready(function() {
    $('#display-button').click(function() {
        const date = $('#date-input').val();
        const weekOfPregnancy = parseInt($('#week-input').val());
        const dayOfPregnancy = parseInt($('#day-input').val());
        const resolution = $('#resolution-select').val();

        const startDate = calculateStartDate(date, weekOfPregnancy, dayOfPregnancy);
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

function calculateStartDate(date, weekOfPregnancy, dayOfPregnancy) {
    return moment(date).subtract(weekOfPregnancy - 1, 'weeks').subtract(dayOfPregnancy - 1, 'days');
}

function calculatePregnancyEvents(startDate, resolution) {
    const currentDate = moment();
    const events = [];

    if (resolution === 'day') {
        for (let i = 1; i <= 40; i++) {
            const eventStart = startDate.clone().add(i - 1, 'days');
            const eventEnd = eventStart.clone().add(1, 'days');

            const event = {
                title: `Week ${i} - Day ${eventStart.format('D')}`,
                start: eventStart.format('YYYY-MM-DD'),
                end: eventEnd.format('YYYY-MM-DD')
            };

            if (currentDate.isBetween(eventStart, eventEnd, 'day', '[]')) {
                event.color = 'red';
            }

            events.push(event);
        }
    } else {
        for (let i = 1; i <= 40; i++) {
            const eventStart = startDate.clone().add((i - 1) * 7, 'days');
            const eventEnd = eventStart.clone().add(7, 'days');

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
