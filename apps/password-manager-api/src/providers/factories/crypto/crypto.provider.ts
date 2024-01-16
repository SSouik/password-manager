import { FactoryProvider } from '@nestjs/common';
import { AppConfig } from '@password-manager:api:config';
import { IConfigService } from '@password-manager:api:interfaces';
import { DependencyInjectionTokenEnum } from '@password-manager:api:types';
import { AlgorithmEnum, Crypto, EncodingEnum } from '@password-manager:crypto';

export default <FactoryProvider>{
    provide: DependencyInjectionTokenEnum.CRYPTO,
    useFactory: (configService: IConfigService<AppConfig>): Crypto => {
        return Crypto.create()
            .withAlgorithm(AlgorithmEnum.AES256CTR)
            .withSecret(configService.get('encryptionKey'))
            .withInitializationVector(configService.get('initializationVector'))
            .withEncoding(EncodingEnum.Base64);
    },
    inject: [DependencyInjectionTokenEnum.CONFIG_SERVICE],
};
