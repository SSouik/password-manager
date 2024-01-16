import AuthServiceProvider from './auth.provider';
import ClientServiceProvider from './client.provider';
import ConfigServiceProvider from './conifg.provider';
import HealthCheckServiceProvider from './health-check.provider';
import JWTServiceProvider from './jwt.provider';
import PasswordServiceProvider from './password.provider';

export default [
    AuthServiceProvider,
    ClientServiceProvider,
    ConfigServiceProvider,
    HealthCheckServiceProvider,
    JWTServiceProvider,
    PasswordServiceProvider,
];
