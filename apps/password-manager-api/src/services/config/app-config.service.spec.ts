import { AppConfig, AppEnvironment } from '@password-manager:api:config';
import { ApplicationConfig, IApplicationConfig } from '@password-manager:config';
import { EnvironmentEnum } from '@password-manager:types';

import { AppConfigService } from './app-config.service';

describe('AppConfigService Tests', () => {
    let mockApplicationConfig: IApplicationConfig<AppConfig, AppEnvironment>;
    let service: AppConfigService;

    beforeEach(() => {
        mockApplicationConfig = new ApplicationConfig<AppConfig, AppEnvironment>(process.env);
        mockApplicationConfig.map('environment', 'ENVIRONMENT').withDefaultValue(EnvironmentEnum.Local);
        mockApplicationConfig.map('region', 'REGION').withDefaultValue('us-west-1');

        service = new AppConfigService(mockApplicationConfig);
    });

    it('Gets the current app environment', () => {
        expect(service.getEnvironment()).toBe(EnvironmentEnum.Local);
    });

    it('Gets the value of a config key', () => {
        expect(service.get('region')).toBe('us-west-1');
    });
});
