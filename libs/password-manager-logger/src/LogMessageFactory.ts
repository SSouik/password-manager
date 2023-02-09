import { EnvironmentEnum } from '@password-manager:types';
import { v4 as uuid } from 'uuid';

import { ILogMessageFactory, LogLevelEnum, LogPropertyEnum } from './types';
import { LogMessage } from './types/LogMessage';

export class LogMessageFactory implements ILogMessageFactory {
    private message: LogMessage;

    constructor(defaults?: Partial<LogMessage>) {
        this.message = <LogMessage>{
            ID: '',
            TimeStamp: '',
            Environment: EnvironmentEnum.Local,
            LogLevel: LogLevelEnum.Info,
            Message: '',
            CommitSha: '',
            TraceID: '',
            Region: 'us-east-1',
            UserIP: '',
            UserAgent: '',
            Context: {},
            ...defaults,
        };
    }

    public setProperty(logProperty: LogPropertyEnum, value: string): ILogMessageFactory {
        this.message[logProperty] = value;
        return this;
    }

    public setContext(key: string, value: any): ILogMessageFactory {
        this.message.Context[key] = value;
        return this;
    }

    public create(level: LogLevelEnum, message: string, context: any): LogMessage {
        this.message.ID = uuid();
        this.message.TimeStamp = new Date().toISOString();
        this.message.LogLevel = level;
        this.message.Message = message;
        this.message.Context = Object.assign({}, this.message.Context, context);

        return this.message;
    }
}
