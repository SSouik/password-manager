export * from './factories';
export * from './values';

import FactoryProviders from './factories';
import ValueProviders from './values';

export default [...FactoryProviders, ...ValueProviders];
