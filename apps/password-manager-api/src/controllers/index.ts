import { ChallengeController } from './challenge/challenge.controller';
import { ClientController } from './client/client.controller';
import { HealthCheckController } from './healthcheck/healthcheck.controller';
import { LoginController } from './login/login.controller';
import { PasswordsController } from './passwords/passwords.controller';
import { SecurityQuestionController } from './security-question/security-question.controller';

export default [
    ChallengeController,
    ClientController,
    HealthCheckController,
    LoginController,
    PasswordsController,
    SecurityQuestionController,
];
