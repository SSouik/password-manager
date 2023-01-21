import { Optional } from '@password-manager:types';

export class ConfigValue<T> {
    private value: Optional<T[keyof T]>;

    constructor(private initialValue: Optional<string>) {}

    public withDefaultValue(value: T[keyof T]): ConfigValue<T> {
        if (this.initialValue === undefined && this.value === undefined) {
            this.value = value;
        }

        return this;
    }

    public parse(parser: (value: Optional<string>) => Optional<T[keyof T]>): ConfigValue<T> {
        // Default value has not been set, need to parse
        if (this.value === undefined) {
            this.value = parser(this.initialValue);
        }

        return this;
    }

    public getValue(): Optional<T[keyof T]> {
        return this.value ?? (this.initialValue as Optional<T[keyof T]>);
    }
}
