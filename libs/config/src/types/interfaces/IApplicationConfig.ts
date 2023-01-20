import { Optional } from '@password-manager:types';

import { ConfigValue } from '../../ConfigValue';

export interface IApplicationConfig<T, K> {
    map(configKey: keyof T, environmentKey: keyof K): ConfigValue<T>;
    get(configKey: keyof T): Optional<T[keyof T]>;
}
