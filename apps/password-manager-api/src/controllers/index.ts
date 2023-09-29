import { AuthController } from './auth/auth.controller';
import { ClientController } from './client/client.controller';
import { HealthCheckController } from './healthcheck/healthcheck.controller';
import { PasswordsController } from './passwords/passwords.controller';

export default [ClientController, HealthCheckController, AuthController, PasswordsController];
