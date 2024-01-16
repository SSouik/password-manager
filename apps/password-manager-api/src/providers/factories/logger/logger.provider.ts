import { FactoryProvider, Scope } from '@nestjs/common';
import { DependencyInjectionTokenEnum } from '@password-manager:api:types';
import { ILogger, ILogMessageFactory, Logger } from '@password-manager:logger';

export default <FactoryProvider>{
    provide: DependencyInjectionTokenEnum.LOGGER,
    scope: Scope.REQUEST,
    useFactory: (logMessageFactory: ILogMessageFactory): ILogger => {
        return new Logger(logMessageFactory);
    },
    inject: [DependencyInjectionTokenEnum.LOG_MESSAGE_FACTORY],
};
