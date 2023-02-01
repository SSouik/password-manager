export * from './crypto';
export * from './databases';
export * from './logger';

import CryptoProviders from './crypto';
import DatabaseProviders from './databases';
import LoggerProviders from './logger';

export default [...CryptoProviders, ...DatabaseProviders, ...LoggerProviders];
