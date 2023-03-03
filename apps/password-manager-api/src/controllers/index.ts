import { AnswerSecurityQuestionChallengeController } from './answer-security-question-challenge/answer-security-question-challenge.controller';
import { CreatePasswordController } from './create-password/create-password.controller';
import { DeletePasswordController } from './delete-password/delete-password.controller';
import { GetPasswordsController } from './get-passwords/get-passwords.controller';
import { GetSecurityQuestionChallengeController } from './get-security-question-challenge/get-security-question-challenge.controller';
import { HealthCheckController } from './healthcheck/healthcheck.controller';
import { LoginController } from './login/login.controller';
import { UpdatePasswordController } from './update-password/update-password.controller';

export default [
    AnswerSecurityQuestionChallengeController,
    CreatePasswordController,
    DeletePasswordController,
    GetPasswordsController,
    GetSecurityQuestionChallengeController,
    HealthCheckController,
    LoginController,
    UpdatePasswordController,
];
