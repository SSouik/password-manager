export class Parsers {
    public static parseNumber(value: string | undefined): number | undefined {
        if (value === undefined || isNaN(+value)) {
            return undefined;
        }

        return +value;
    }

    public static parseBoolean(value: string | undefined): boolean | undefined {
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

    public static parseArray<T>(value: string | undefined): Array<T> {
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
