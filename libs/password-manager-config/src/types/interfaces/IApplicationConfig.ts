import { Optional } from '@password-manager:types';

import { ConfigValue } from '../../ConfigValue';

export interface IApplicationConfig<T, K> {
    map(configKey: keyof T, environmentKey: keyof K): ConfigValue<T, keyof T>;
    get<CK extends keyof T>(configKey: CK): Optional<T[CK]>;
}
