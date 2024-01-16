import { FactoryProvider } from '@nestjs/common';
import { JWTBuilder } from '@password-manager:api:builders';
import { AppConfig } from '@password-manager:api:config';
import { IConfigService, IJWTBuilder } from '@password-manager:api:interfaces';
import { DependencyInjectionTokenEnum } from '@password-manager:api:types';
import { JWTAlgorithmEnum, JWTPayload } from '@password-manager:types';

export default <FactoryProvider>{
    provide: DependencyInjectionTokenEnum.JWT_BUILDER,
    useFactory: (configService: IConfigService<AppConfig>): IJWTBuilder<JWTPayload> => {
        return JWTBuilder.create<JWTPayload>()
            .withSecret(configService.get('jwtSecret'))
            .withAlgorithm(JWTAlgorithmEnum.HS256)
            .addIssuer(configService.get('appUrl').href);
    },
    inject: [DependencyInjectionTokenEnum.CONFIG_SERVICE],
};
