import { ValueProvider } from '@nestjs/common';
import { appConfig } from '@password-manager:api:config';
import { DependencyInjectionTokenEnum } from '@password-manager:api:types';

export default <ValueProvider>{
    provide: DependencyInjectionTokenEnum.APP_CONFIG,
    useValue: appConfig,
};
