import AuthService from './auth/auth.service';
import ClientService from './client/client.service';
import AppConfigService from './config/app-config.service';
import JWTService from './jwt/jwt.service';
import PasswordService from './password/password.service';

export default [AuthService, ClientService, AppConfigService, JWTService, PasswordService];
