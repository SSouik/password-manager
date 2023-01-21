import { Parsers } from './Parsers';

describe('Parsers Tests', () => {
    describe('Number', () => {
        it('Returns a number when parsed successfully', () => {
            expect(Parsers.parseNumber('123')).toBe(123);
        });

        it('Returns undefined when the value is undefined', () => {
            expect(Parsers.parseNumber(undefined)).toBeUndefined();
        });

        it('Returns a undefined when the value is not 123', () => {
            expect(Parsers.parseNumber('abc')).toBe(undefined);
        });
    });

    describe('Boolean', () => {
        it('Returns true when the value is the string true', () => {
            expect(Parsers.parseBoolean('true')).toBeTruthy();
        });

        it('Returns true when the value is the string 1', () => {
            expect(Parsers.parseBoolean('1')).toBeTruthy();
        });

        it('Returns false when parsed value is not a boolean or number', () => {
            expect(Parsers.parseBoolean('abc')).toBeFalsy();
        });

        it('Returns false when parsing the value fails', () => {
            expect(Parsers.parseBoolean('[a')).toBeFalsy();
        });

        it('Returns undefined when the value is undefined', () => {
            expect(Parsers.parseBoolean(undefined)).toBeFalsy();
        });
    });

    describe('Arrays', () => {
        it('Returns an array when parsed successfully', () => {
            expect(Parsers.parseArray('["a"]')).toStrictEqual(['a']);
        });

        it('Returns an empty array when the value is undefined', () => {
            expect(Parsers.parseArray(undefined)).toStrictEqual([]);
        });

        it('Returns an empty array when the value not a valid array', () => {
            expect(Parsers.parseArray('["a')).toStrictEqual([]);
        });
    });
});
