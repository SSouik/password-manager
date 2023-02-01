import { FactoryProvider, InjectionToken } from '@nestjs/common';
import { AppConfig } from '@password-manager:api:config';
import { IAppConfigService } from '@password-manager:api:interfaces';
import { APP_CONFIG_SERVICE } from '@password-manager:api:services';
import { AlgorithmEnum, Crypto, EncodingEnum } from '@password-manager:crypto';

export const CRYPTO: InjectionToken = 'Crypto';

export default <FactoryProvider>{
    provide: CRYPTO,
    useFactory: (appConfigService: IAppConfigService<AppConfig>): Crypto => {
        return Crypto.create()
            .withAlgorithm(AlgorithmEnum.AES256GCM)
            .withSecret(appConfigService.get('encryptionKey'))
            .withEncoding(EncodingEnum.Base64);
    },
    inject: [APP_CONFIG_SERVICE],
};
