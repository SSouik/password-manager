import AuthService from './auth/auth.service';
import ChallengeService from './challenge/challenge.service';
import ClientService from './client/client.service';
import AppConfigService from './config/app-config.service';
import JWTService from './jwt/jwt.service';
import PasswordService from './password/password.service';

export default [AuthService, ChallengeService, ClientService, AppConfigService, JWTService, PasswordService];
