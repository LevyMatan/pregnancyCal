
const PregnancyProgressCalculator = {

    calculateStartDateFromDueDate(dueDate) {
        return moment(dueDate).subtract(40, 'weeks');
    },

    calculateStartDateFromLastPeriodDate(lastPeriodDate) {
        return moment(lastPeriodDate).add(1, 'day');
    },

    calculateStartDate(date, weekOfPregnancy, dayOfPregnancy) {
        return moment(date).subtract(weekOfPregnancy - 1, 'weeks').subtract(dayOfPregnancy - 1, 'days');
    },

    calculatePregnancyEvents(startDate, resolution) {
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
    },

}


// Export the object
export default PregnancyProgressCalculator;