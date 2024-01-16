import { Injectable } from '@nestjs/common';
import { AppConfig, AppEnvironment } from '@password-manager:api:config';
import { IConfigService } from '@password-manager:api:interfaces';
import { IApplicationConfig } from '@password-manager:config';
import { EnvironmentEnum } from '@password-manager:types';

@Injectable()
export class ConfigService implements IConfigService<AppConfig> {
    constructor(private readonly appConfig: IApplicationConfig<AppConfig, AppEnvironment>) {}

    public getEnvironment(): EnvironmentEnum {
        return this.appConfig.get('environment');
    }

    public get<K extends keyof AppConfig>(key: K): AppConfig[K] | undefined {
        return this.appConfig.get(key);
    }
}
