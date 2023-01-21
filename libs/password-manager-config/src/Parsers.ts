import { Optional } from '@password-manager:types';

export class Parsers {
    public static parseNumber(value: Optional<string>): Optional<number> {
        if (value === undefined || isNaN(+value)) {
            return undefined;
        }

        return +value;
    }

    public static parseBoolean(value: Optional<string>): Optional<boolean> {
        // If the value is undefined, return undefined
        // So that if a default value is provided, it can be used
        if (value === undefined) {
            return undefined;
        }

        try {
            return Boolean(JSON.parse(value.toLowerCase()));
        } catch (error) {
            return false;
        }
    }

    public static parseArray<T>(value: Optional<string>): Optional<Array<T>> {
        try {
            if (value === undefined) {
                return [];
            }

            return JSON.parse(value);
        } catch (error) {
            return [];
        }
    }
}
