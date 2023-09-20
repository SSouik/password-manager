import { AuthController } from './auth/auth.controller';
import { ChallengeController } from './challenge/challenge.controller';
import { ClientController } from './client/client.controller';
import { HealthCheckController } from './healthcheck/healthcheck.controller';
import { PasswordsController } from './passwords/passwords.controller';
import { SecurityQuestionController } from './security-question/security-question.controller';

export default [
    ChallengeController,
    ClientController,
    HealthCheckController,
    AuthController,
    PasswordsController,
    SecurityQuestionController,
];
