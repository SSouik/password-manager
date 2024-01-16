import { FactoryProvider } from '@nestjs/common';
import { JWTService } from '@password-manager:api:services';
import { DependencyInjectionTokenEnum, IJWTBuilder, IJWTService } from '@password-manager:api:types';
import { ILogger } from '@password-manager:logger';
import { JWTPayload } from '@password-manager:types';

export default <FactoryProvider>{
    provide: DependencyInjectionTokenEnum.JWT_SERVICE,
    useFactory: (logger: ILogger, jwtBuilder: IJWTBuilder<JWTPayload>): IJWTService => {
        return new JWTService(logger, jwtBuilder);
    },
    inject: [DependencyInjectionTokenEnum.LOGGER, DependencyInjectionTokenEnum.JWT_BUILDER],
};
