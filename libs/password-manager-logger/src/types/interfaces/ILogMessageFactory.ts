import { LogLevelEnum, LogPropertyEnum } from '../enums';
import { LogMessage } from '../LogMessage';

export interface ILogMessageFactory {
    setProperty(logProperty: LogPropertyEnum, value: string): ILogMessageFactory;
    setContext(key: string, value: any): ILogMessageFactory;
    create(level: LogLevelEnum, message: string, context: any): LogMessage;
}
