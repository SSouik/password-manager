import { FactoryProvider } from '@nestjs/common';
import { AppConfig } from '@password-manager:api:config';
import { HealthCheckService } from '@password-manager:api:services';
import { DependencyInjectionTokenEnum, IConfigService, IHealthCheckService } from '@password-manager:api:types';

export default <FactoryProvider>{
    provide: DependencyInjectionTokenEnum.HEALTH_CHECK_SERVICE,
    useFactory: (configService: IConfigService<AppConfig>): IHealthCheckService => {
        return new HealthCheckService(configService);
    },
    inject: [DependencyInjectionTokenEnum.CONFIG_SERVICE],
};
