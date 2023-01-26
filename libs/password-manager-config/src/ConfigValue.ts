export class ConfigValue<T, K extends keyof T> {
    private value: T[K] | undefined;

    constructor(private initialValue: string | undefined) {}

    public withDefaultValue(value: T[K]): ConfigValue<T, K> {
        if (this.initialValue === undefined && this.value === undefined) {
            this.value = value;
        }

        return this;
    }

    public parse(parser: (value: string | undefined) => T[K] | undefined): ConfigValue<T, K> {
        // Default value has not been set, need to parse
        if (this.value === undefined) {
            this.value = parser(this.initialValue);
        }

        return this;
    }

    public getValue(): T[K] | undefined {
        return this.value ?? (this.initialValue as T[K] | undefined);
    }
}
