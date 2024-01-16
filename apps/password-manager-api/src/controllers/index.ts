import { AuthController } from './auth/auth.controller';
import { ClientController } from './client/client.controller';
import { HealthCheckController } from './health-check/health-check.controller';
import { PasswordsController } from './passwords/passwords.controller';

export default [ClientController, HealthCheckController, AuthController, PasswordsController];
