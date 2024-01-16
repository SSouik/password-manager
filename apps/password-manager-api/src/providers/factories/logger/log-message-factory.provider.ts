import { FactoryProvider, Scope } from '@nestjs/common';
import { AppConfig } from '@password-manager:api:config';
import { IConfigService } from '@password-manager:api:interfaces';
import { DependencyInjectionTokenEnum } from '@password-manager:api:types';
import { ILogMessageFactory, LogMessageFactory } from '@password-manager:logger';

export default <FactoryProvider>{
    provide: DependencyInjectionTokenEnum.LOG_MESSAGE_FACTORY,
    scope: Scope.REQUEST, // new up on every request
    useFactory: (configService: IConfigService<AppConfig>): ILogMessageFactory => {
        return new LogMessageFactory({
            CommitSha: configService.get('commitSha'),
            Region: configService.get('region'),
            Environment: configService.getEnvironment(),
        });
    },
    inject: [DependencyInjectionTokenEnum.CONFIG_SERVICE],
};
