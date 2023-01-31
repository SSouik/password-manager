import { EnvironmentEnum } from '@password-manager:types';

export interface IAppConfigService<T> {
    getEnvironment(): EnvironmentEnum;
    get<K extends keyof T>(key: K): T[K] | undefined;
}
