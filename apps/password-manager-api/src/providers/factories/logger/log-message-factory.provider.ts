import { FactoryProvider, InjectionToken, Scope } from '@nestjs/common';
import { AppConfig } from '@password-manager:api:config';
import { IAppConfigService } from '@password-manager:api:interfaces';
import { APP_CONFIG_SERVICE } from '@password-manager:api:services';
import { ILogMessageFactory, LogMessageFactory } from '@password-manager:logger';

export const LOG_MESSAGE_FACTORY: InjectionToken = 'LogMessageFactory';

export default <FactoryProvider>{
    provide: LOG_MESSAGE_FACTORY,
    scope: Scope.REQUEST, // new up on every request
    useFactory: (appConfigService: IAppConfigService<AppConfig>): ILogMessageFactory => {
        return new LogMessageFactory({
            CommitSha: appConfigService.get('commitSha'),
            Region: appConfigService.get('region'),
            Environment: appConfigService.getEnvironment(),
        });
    },
    inject: [APP_CONFIG_SERVICE],
};
