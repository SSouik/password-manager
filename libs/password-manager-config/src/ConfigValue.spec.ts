import { ConfigValue } from './ConfigValue';
import { Parsers } from './Parsers';

describe('ConfigValue Tests', () => {
    describe('Default Value and Initial Value', () => {
        it('Returns value as the inital value when it is not undefined', () => {
            const configValue = new ConfigValue<any>('123');
            expect(configValue.getValue()).toBe('123');
        });

        it('Returns value as the default value when the inital value is undefined', () => {
            const configValue = new ConfigValue<any>(undefined).withDefaultValue('123');
            expect(configValue.getValue()).toBe('123');
        });

        it('Returns value as the initial value when the inital value is defined and a default value is provided', () => {
            const configValue = new ConfigValue<any>('abc').withDefaultValue('123');
            expect(configValue.getValue()).toBe('abc');
        });
    });

    describe('Parse', () => {
        it('Parses the initial value when it is defined', () => {
            const configValue = new ConfigValue<any>('123').parse(Parsers.parseNumber);
            expect(configValue.getValue()).toBe(123);
        });

        it('Parses the initial value when it is undefined', () => {
            const configValue = new ConfigValue<any>(undefined).parse(Parsers.parseNumber);
            expect(configValue.getValue()).toBeUndefined();
        });

        it('Parses the initial value when it is defined and a default value is provided', () => {
            const configValue = new ConfigValue<any>('123').withDefaultValue(1).parse(Parsers.parseNumber);
            expect(configValue.getValue()).toBe(123);
        });

        it('Does not parse the initial value when it is undefined and a default value is provided before parsing', () => {
            const configValue = new ConfigValue<any>(undefined).withDefaultValue(1).parse(Parsers.parseNumber);
            expect(configValue.getValue()).toBe(1);
        });

        it('Parses the initial value when it is undefined and a default value is provided after parsing', () => {
            const configValue = new ConfigValue<any>(undefined).parse(Parsers.parseNumber).withDefaultValue(1);
            expect(configValue.getValue()).toBe(1);
        });
    });
});
