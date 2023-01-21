import { ApplicationConfig } from './ApplicationConfig';
import { Parsers } from './Parsers';

type TestConfig = {
    foo: string;
    bar: number;
    foobar: boolean;
    barfoo: Array<string>;
};

type TestEnvironment = {
    FOO: string;
    BAR: string;
    FOOBAR: string;
    BARFOO: string;
};

describe('ApplicationConfig Tests', () => {
    let config: ApplicationConfig<TestConfig, TestEnvironment>;

    beforeEach(() => {
        config = new ApplicationConfig<TestConfig, TestEnvironment>(process.env);
    });

    afterEach(() => {
        delete process.env['FOO'];
        delete process.env['BAR'];
        delete process.env['FOOBAR'];
        delete process.env['BARFOO'];
    });

    it('Maps a defined value', () => {
        process.env['FOO'] = 'bar';

        config.map('foo', 'FOO');

        expect(config.get('foo')).toBe('bar');
    });

    it('Returns undefined when getting the value of an unmapped value', () => {
        expect(config.get('foo')).toBeUndefined();
    });

    it('Sets the default value of a config value when it is undefined', () => {
        config.map('foo', 'FOO').withDefaultValue('default');

        expect(config.get('foo')).toBe('default');
    });

    it('Parses the value into a number', () => {
        process.env['BAR'] = '123';

        config.map('bar', 'BAR').parse(Parsers.parseNumber);

        expect(config.get('bar')).toBe(123);
    });

    it('Parses the value into a boolean', () => {
        process.env['FOOBAR'] = 'true';

        config.map('foobar', 'FOOBAR').parse(Parsers.parseBoolean);

        expect(config.get('foobar')).toBe(true);
    });

    it('Parses the value into an array', () => {
        process.env['BARFOO'] = '["a", "b"]';

        config.map('barfoo', 'BARFOO').parse(Parsers.parseArray);

        expect(config.get('barfoo')).toStrictEqual(['a', 'b']);
    });
});
