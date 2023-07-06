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


function generateICalContent(startDate, resolution) {
    const events = calculatePregnancyEvents(startDate, resolution);
    const cal = ics();

    events.forEach((event, index) => {
      const start = moment(event.start).format('MM/DD/YYYY');
      const end = moment(event.end).format('MM/DD/YYYY');

      cal.addEvent(event.title, '', '', start, end);
    });

    return cal.download("Pregnancy Progress Calendar");
}



// Export the object
export {    calculateStartDateFromDueDate,
            calculateStartDateFromLastPeriodDate,
            calculateStartDate,
            calculatePregnancyEvents,
            generateICalContent};