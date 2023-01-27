import { FactoryProvider, InjectionToken, Scope } from '@nestjs/common';
import { ILogMessageFactory, LogMessageFactory } from '@password-manager:logger';

export const LOG_MESSAGE_FACTORY: InjectionToken = 'LogMessageFactory';

export default <FactoryProvider>{
    provide: LOG_MESSAGE_FACTORY,
    scope: Scope.REQUEST, // new up on every request
    useFactory: (): ILogMessageFactory => {
        return new LogMessageFactory({
            CommitSha: 'commit',
            Region: 'us-west-1',
        });
    },
};
