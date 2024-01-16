import { FactoryProvider } from '@nestjs/common';
import { PasswordService } from '@password-manager:api:services';
import { DependencyInjectionTokenEnum, IPasswordRepository, IPasswordService } from '@password-manager:api:types';
import { Crypto } from '@password-manager:crypto';

export default <FactoryProvider>{
    provide: DependencyInjectionTokenEnum.PASSWORD_SERVICE,
    useFactory: (passwordRepository: IPasswordRepository, crypto: Crypto): IPasswordService => {
        return new PasswordService(passwordRepository, crypto);
    },
    Inject: [DependencyInjectionTokenEnum.PASSWORD_REPOSITORY, DependencyInjectionTokenEnum.CRYPTO],
};
