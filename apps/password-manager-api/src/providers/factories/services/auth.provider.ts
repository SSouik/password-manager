import { FactoryProvider } from '@nestjs/common';
import { AuthService } from '@password-manager:api:services';
import {
    DependencyInjectionTokenEnum,
    IAuthService,
    IClientRepository,
    IJWTService,
} from '@password-manager:api:types';
import { Crypto } from '@password-manager:crypto';

export default <FactoryProvider>{
    provide: DependencyInjectionTokenEnum.AUTH_SERVICE,
    useFactory: (clientRepository: IClientRepository, jwtService: IJWTService, crypto: Crypto): IAuthService => {
        return new AuthService(clientRepository, jwtService, crypto);
    },
    inject: [
        DependencyInjectionTokenEnum.CLIENT_REPOSITORY,
        DependencyInjectionTokenEnum.JWT_SERVICE,
        DependencyInjectionTokenEnum.CRYPTO,
    ],
};
