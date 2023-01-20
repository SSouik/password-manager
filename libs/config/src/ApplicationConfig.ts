import { Optional } from '@password-manager:types';

import { ConfigValue } from './ConfigValue';
import { IApplicationConfig } from './types/interfaces/IApplicationConfig';

export class ApplicationConfig<T, K> implements IApplicationConfig<T, K> {
    private config: Map<keyof T, ConfigValue<T>> = new Map<keyof T, ConfigValue<T>>();

    constructor(private readonly environment: NodeJS.ProcessEnv) {}

    public map(configKey: keyof T, environmentKey: keyof K): ConfigValue<T> {
        const value = this.environment[environmentKey] as Optional<string>;
        const configValue = new ConfigValue<T>(value);

        this.config.set(configKey, configValue);

        return configValue;
    }

    public get(configKey: keyof T): Optional<T[keyof T]> {
        return this.config.get(configKey)?.getValue();
    }
}