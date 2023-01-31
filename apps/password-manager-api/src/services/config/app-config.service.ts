import { Injectable } from '@nestjs/common';
import { InjectionToken } from '@nestjs/common';
import { ClassProvider } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { AppConfig, AppEnvironment } from '@password-manager:api:config';
import { IAppConfigService } from '@password-manager:api:interfaces';
import { APP_CONFIG } from '@password-manager:api:providers/values/config/app-config.provider';
import { IApplicationConfig } from '@password-manager:config';
import { EnvironmentEnum } from '@password-manager:types';

@Injectable()
export class AppConfigService implements IAppConfigService<AppConfig> {
    constructor(@Inject(APP_CONFIG) private readonly appConfig: IApplicationConfig<AppConfig, AppEnvironment>) {}

    public getEnvironment(): EnvironmentEnum {
        return this.appConfig.get('environment');
    }

    get<K extends keyof AppConfig>(key: K): AppConfig[K] | undefined {
        return this.appConfig.get(key);
    }
}

export const APP_CONFIG_SERVICE: InjectionToken = 'AppConfigService';

export default <ClassProvider>{
    provide: APP_CONFIG_SERVICE,
    useClass: AppConfigService,
};
