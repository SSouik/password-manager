import { FactoryProvider } from '@nestjs/common';
import { AppConfig, AppEnvironment } from '@password-manager:api:config';
import { ConfigService } from '@password-manager:api:services';
import { DependencyInjectionTokenEnum, IConfigService } from '@password-manager:api:types';
import { ApplicationConfig } from '@password-manager:config';

export default <FactoryProvider>{
    provide: DependencyInjectionTokenEnum.CONFIG_SERVICE,
    useFactory: (appConfig: ApplicationConfig<AppConfig, AppEnvironment>): IConfigService<AppConfig> => {
        return new ConfigService(appConfig);
    },
    inject: [DependencyInjectionTokenEnum.APP_CONFIG],
};
