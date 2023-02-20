import { FactoryProvider, InjectionToken } from '@nestjs/common';
import { AppConfig } from '@password-manager:api:config';
import { IAppConfigService } from '@password-manager:api:interfaces';
import { APP_CONFIG_SERVICE } from '@password-manager:api:services/config/app-config.service';
import { AlgorithmEnum, Crypto, EncodingEnum } from '@password-manager:crypto';

export const CRYPTO: InjectionToken = 'Crypto';

export default <FactoryProvider>{
    provide: CRYPTO,
    useFactory: (appConfigService: IAppConfigService<AppConfig>): Crypto => {
        return Crypto.create()
            .withAlgorithm(AlgorithmEnum.AES256CTR)
            .withSecret(appConfigService.get('encryptionKey'))
            .withInitializationVector(appConfigService.get('initializationVector'))
            .withEncoding(EncodingEnum.Base64);
    },
    inject: [APP_CONFIG_SERVICE],
};
