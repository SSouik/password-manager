export * from './config/app-config.service';
export * from './jwt/jwt.service';

import AppConfigService from './config/app-config.service';
import JWTService from './jwt/jwt.service';

export default [AppConfigService, JWTService];
