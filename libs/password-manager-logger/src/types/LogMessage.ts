import { EnvironmentEnum } from '@password-manager:types';

import { LogLevelEnum, LogPropertyEnum } from './enums';

export type LogMessage = {
    LogLevel: LogLevelEnum;
    Environment: EnvironmentEnum;
    [LogPropertyEnum.ID]: string;
    [LogPropertyEnum.TimeStamp]: string;
    [LogPropertyEnum.CommitSha]: string;
    [LogPropertyEnum.TraceID]: string;
    [LogPropertyEnum.Region]: string;
    [LogPropertyEnum.UserIP]: string;
    [LogPropertyEnum.UserAgent]: string;
    Message: string;
    Context: any;
};
