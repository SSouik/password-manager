import { ConfigValue } from './ConfigValue';
import { IApplicationConfig } from './types/interfaces/IApplicationConfig';

export class ApplicationConfig<T, K> implements IApplicationConfig<T, K> {
    private config: Map<keyof T, ConfigValue<T, keyof T>> = new Map<keyof T, ConfigValue<T, keyof T>>();

    constructor(private readonly environment: NodeJS.ProcessEnv) {}

    public map<TKey extends keyof T>(configKey: TKey, environmentKey: keyof K): ConfigValue<T, TKey> {
        const value = this.environment[environmentKey] as string | undefined;
        const configValue = new ConfigValue<T, TKey>(value);

        this.config.set(configKey, configValue);

        return configValue;
    }

    public get<TKey extends keyof T>(configKey: TKey): T[TKey] | undefined {
        const value = this.config.get(configKey) as ConfigValue<T, TKey>;
        return value?.getValue();
    }
}
