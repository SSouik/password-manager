import { FactoryProvider, InjectionToken } from '@nestjs/common';
import { JWTBuilder } from '@password-manager:api:builders/jwt/jwt.builder';
import { AppConfig } from '@password-manager:api:config';
import { IAppConfigService, IJWTBuilder } from '@password-manager:api:interfaces';
import { APP_CONFIG_SERVICE } from '@password-manager:api:services';
import { JWTAlgorithmEnum, JWTPayload } from '@password-manager:types';

export const JWT_BUILDER: InjectionToken = 'JWTBuilder';

export default <FactoryProvider>{
    provide: JWT_BUILDER,
    useFactory: (appConfigService: IAppConfigService<AppConfig>): IJWTBuilder<JWTPayload> => {
        return JWTBuilder.create<JWTPayload>()
            .withSecret(appConfigService.get('jwtSecret'))
            .withAlgorithm(JWTAlgorithmEnum.HS256)
            .addIssuer(appConfigService.get('appUrl').href);
    },
    inject: [APP_CONFIG_SERVICE],
};
