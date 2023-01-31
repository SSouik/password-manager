import { ValueProvider, InjectionToken } from '@nestjs/common';
import { appConfig } from '@password-manager:api:config';

export const APP_CONFIG: InjectionToken = 'AppConfig';

export default <ValueProvider>{
    provide: APP_CONFIG,
    useValue: appConfig,
};
