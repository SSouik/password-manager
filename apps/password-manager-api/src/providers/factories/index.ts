export * from './databases';
export * from './logger';

import DatabaseProviders from './databases';
import LoggerProviders from './logger';

export default [...DatabaseProviders, ...LoggerProviders];
