/**
 * @fileoverview This file contains the functions for calculating the pregnancy progress.
 * @version 1.0.0
 *
 */

/**
 * Calculates the start date of the pregnancy based on the due date.
 * @param {string} dueDate - The due date of the pregnancy (format: YYYY-MM-DD).
 * @returns {moment} - The calculated start date.
 */
function calculateStartDateFromDueDate(dueDate) {
  return moment(dueDate).subtract(40, 'weeks');
}

/**
 * Calculates the start date of the pregnancy based on the last period date.
 * @param {string} lastPeriodDate - The last period date (format: YYYY-MM-DD).
 * @returns {moment} - The calculated start date.
 */
function calculateStartDateFromLastPeriodDate(lastPeriodDate) {
  return moment(lastPeriodDate);
}

/**
 * Calculates the start date of the pregnancy based on the provided date, week of pregnancy, and day of pregnancy.
 * @param {string} date - The reference date for calculating the start date (format: YYYY-MM-DD).
 * @param {number} weekOfPregnancy - The week of pregnancy.
 * @param {number} dayOfPregnancy - The day of pregnancy.
 * @returns {moment} - The calculated start date.
 */
function calculateStartDate(date, weekOfPregnancy, dayOfPregnancy) {
  const daysToSubtract = (weekOfPregnancy - 1) * 7 + (dayOfPregnancy - 1);
  return moment(date).subtract(daysToSubtract, 'days');
}

/**
 * Calculates the pregnancy events based on the start date and resolution.
 * @param {moment} startDate - The start date of the pregnancy.
 * @param {string} resolution - The resolution of the events ('day' or 'week').
 * @param {number} [weeks=40] - The total number of weeks to generate events for.
 * @returns {Array} - An array of pregnancy events.
 */
function calculatePregnancyEvents(startDate, resolution, weeks = 40) {
  const currentDate = moment();
  const events = [];

  for (let i = 1; i <= weeks; i++) {
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

  // Add a special event for the due date
  const dueDate = startDate.clone().add(40, 'weeks').subtract(1, 'day');
  const dueDateEnd = dueDate.clone().add(1, 'days');
  events.push({
    title: 'Expected Due Date',
    start: dueDate.format('YYYY-MM-DD'),
    end: dueDateEnd.format('YYYY-MM-DD'),
    allDay: true,
    backgroundColor: '#28a745', // A distinct green color
    borderColor: '#28a745',
    textColor: '#ffffff'
  });

  return events;
}

/**
 * Generates the iCal content based on the start date and resolution.
 * @param {moment} startDate - The start date of the pregnancy.
 * @param {string} resolution - The resolution of the events ('day' or 'week').
 * @param {number} [weeks=40] - The total number of weeks to generate events for.
 * @returns {string} - TheiCal content in string format.
 */
function generateICal(startDate, resolution, weeks = 40) {
  const events = calculatePregnancyEvents(startDate, resolution, weeks);
  const cal = ics();

  events.forEach((event, index) => {
    const start = moment(event.start).format('MM/DD/YYYY');
    const end = moment(event.end).format('MM/DD/YYYY');

    cal.addEvent(event.title, '', '', start, end);
  });

  return cal;
}

// Export the functions as a module
export {
  calculateStartDateFromDueDate,
  calculateStartDateFromLastPeriodDate,
  calculateStartDate,
  calculatePregnancyEvents,
  generateICal
};
