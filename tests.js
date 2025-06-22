import {
    calculateStartDateFromDueDate,
    calculateStartDateFromLastPeriodDate,
    calculateStartDate,
    calculatePregnancyEvents,
    generateICal
} from './pregnancyProgressCalculatorLib.js';

describe('Pregnancy Progress Calculator Library', function() {

    describe('calculateStartDateFromDueDate', function() {
        it('should calculate the start date correctly from the due date', function() {
            const dueDate = '2023-12-25';
            const expectedStartDate = '2023-03-20';
            const result = calculateStartDateFromDueDate(dueDate);
            expect(result.format('YYYY-MM-DD')).to.equal(expectedStartDate);
        });
    });

    describe('calculateStartDateFromLastPeriodDate', function() {
        it('should calculate the start date correctly from the last period date', function() {
            const lastPeriodDate = '2023-03-13';
            const expectedStartDate = '2023-03-13';
            const result = calculateStartDateFromLastPeriodDate(lastPeriodDate);
            expect(result.format('YYYY-MM-DD')).to.equal(expectedStartDate);
        });
    });

    describe('calculateStartDate', function() {
        it('should calculate the start date correctly from a given date and pregnancy week/day', function() {
            const date = '2023-06-12';
            const week = 13;
            const day = 2;
            const expectedStartDate = '2023-03-19';
            const result = calculateStartDate(date, week, day);
            expect(result.format('YYYY-MM-DD')).to.equal(expectedStartDate);
        });
    });

    describe('calculatePregnancyEvents', function() {
        it('should generate 40 weekly events', function() {
            const startDate = moment('2023-03-20');
            const events = calculatePregnancyEvents(startDate, 'week');
            expect(events).to.have.lengthOf(40);
            expect(events[0].title).to.equal('Week 1');
            expect(events[39].title).to.equal('Week 40');
        });

        it('should generate 280 daily events', function() {
            const startDate = moment('2023-03-20');
            const events = calculatePregnancyEvents(startDate, 'day');
            expect(events).to.have.lengthOf(280);
            expect(events[0].title).to.equal('Week 1 - Day 1');
            expect(events[279].title).to.equal('Week 40 - Day 7');
        });
    });

    describe('generateICal', function() {
        it('should generate a valid iCal object', function() {
            const startDate = moment('2023-03-20');
            const cal = generateICal(startDate, 'week');
            expect(cal).to.be.an('object');
            expect(cal.events).to.be.a('function');
            expect(cal.calendar).to.be.a('function');
            expect(cal.download).to.be.a('function');
            const events = cal.events();
            expect(events).to.have.lengthOf(40);
        });
    });

}); 