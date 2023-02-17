import { DateUtils } from './date.util';

describe('Date Utility Tests', () => {
    describe('Add Days to Date', () => {
        it('Adds days correctly to an existing date', () => {
            const date = new Date('02-17-2023');
            const actual = DateUtils.addDays(date, 10);

            expect(date.getDate()).toBe(17);
            expect(actual.getDate()).toBe(27);
        });
    });

    describe('Add Hours to Date', () => {
        it('Adds hours correctly to an existing date', () => {
            const date = new Date('02-17-2023');
            const actual = DateUtils.addHours(date, 2);

            expect(date.getHours()).toBe(0);
            expect(actual.getHours()).toBe(2);
        });
    });

    describe('Epoch Conversion', () => {
        it('Correctly converts a date to epoch time', () => {
            // The time on the date can vary slightly each time you run tests
            // which will cause this test to fail. The following line
            // ensures that the time returned by the date is always 10000
            jest.spyOn(Date.prototype, 'getTime').mockReturnValue(10000);

            const date = new Date('02-17-2023');
            const actual = DateUtils.toEpoch(date);

            expect(actual).toBe(10);
        });
    });
});
