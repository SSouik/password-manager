import { EnvironmentEnum } from '@password-manager:types';

import { LogLevelEnum, LogPropertyEnum } from './enums';

export type LogMessage = {
    [LogPropertyEnum.ID]: string;
    [LogPropertyEnum.TimeStamp]: string;
    Environment: EnvironmentEnum;
    LogLevel: LogLevelEnum;
    [LogPropertyEnum.Message]: string;
    [LogPropertyEnum.CommitSha]: string;
    [LogPropertyEnum.TraceID]: string;
    [LogPropertyEnum.Region]: string;
    [LogPropertyEnum.UserIP]: string;
    [LogPropertyEnum.UserAgent]: string;
    Context: any;
};
