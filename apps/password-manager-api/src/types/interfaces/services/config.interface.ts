import { EnvironmentEnum } from '@password-manager:types';

export interface IConfigService<T> {
    getEnvironment(): EnvironmentEnum;
    get<K extends keyof T>(key: K): T[K] | undefined;
}
