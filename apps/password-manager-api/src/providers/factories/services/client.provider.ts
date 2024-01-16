import { FactoryProvider } from '@nestjs/common';
import { ClientService } from '@password-manager:api:services';
import {
    DependencyInjectionTokenEnum,
    IClientRepository,
    IClientService,
    IPasswordRepository,
} from '@password-manager:api:types';
import { Crypto } from '@password-manager:crypto';

export default <FactoryProvider>{
    provide: DependencyInjectionTokenEnum.CLIENT_SERVICE,
    useFactory: (
        clientRepository: IClientRepository,
        passwordRepository: IPasswordRepository,
        crypto: Crypto,
    ): IClientService => {
        return new ClientService(clientRepository, passwordRepository, crypto);
    },
    inject: [
        DependencyInjectionTokenEnum.CLIENT_REPOSITORY,
        DependencyInjectionTokenEnum.PASSWORD_REPOSITORY,
        DependencyInjectionTokenEnum.CRYPTO,
    ],
};
