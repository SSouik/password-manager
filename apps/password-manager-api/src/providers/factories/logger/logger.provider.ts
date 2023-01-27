import { FactoryProvider, InjectionToken, Scope } from '@nestjs/common';
import { ILogger, ILogMessageFactory, Logger } from '@password-manager:logger';

import { LOG_MESSAGE_FACTORY } from './log-message-factory.provider';

export const LOGGER: InjectionToken = 'Logger';

export default <FactoryProvider>{
    provide: LOGGER,
    scope: Scope.REQUEST,
    useFactory: (logMessageFactory: ILogMessageFactory): ILogger => {
        return new Logger(logMessageFactory);
    },
    inject: [LOG_MESSAGE_FACTORY],
};
