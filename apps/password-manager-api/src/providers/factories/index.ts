import BuilderProviders from './builders';
import CryptoProviders from './crypto';
import DatabaseProviders from './databases';
import LoggerProviders from './logger';
import RepositoryProviders from './repositories';
import ServiceProviders from './services';

export default [
    ...BuilderProviders,
    ...CryptoProviders,
    ...DatabaseProviders,
    ...LoggerProviders,
    ...RepositoryProviders,
    ...ServiceProviders,
];
