import { EnvironmentEnum } from '@password-manager:types';

import { Logger } from './Logger';
import { LogMessageFactory } from './LogMessageFactory';
import { ILogger, LogLevelEnum, LogMessage } from './types';

jest.mock('uuid', () => ({ v4: () => 'id' }));
jest.mock('chalk', () => ({
    white: (text: string) => text,
    cyan: (text: string) => text,
    yellow: (text: string) => text,
    red: (text: string) => text,
}));

describe('Logger Tests', () => {
    let logger: ILogger;

    beforeEach(() => {
        jest.spyOn(Date.prototype, 'toISOString').mockReturnValue('now');

        [LogLevelEnum.Info, LogLevelEnum.Debug, LogLevelEnum.Warn, LogLevelEnum.Error].forEach((level) => {
            console[level] = jest.fn();
        });

        logger = new Logger(
            new LogMessageFactory({
                ID: 'id',
                TimeStamp: 'now',
                Environment: EnvironmentEnum.Local,
                CommitSha: 'sha',
                TraceID: 'trace-id',
                Region: 'us-west-1',
                UserIP: 'ip',
                UserAgent: 'user-agent',
            }),
        );
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    [LogLevelEnum.Info, LogLevelEnum.Debug, LogLevelEnum.Warn, LogLevelEnum.Error].forEach((level) => {
        describe(`${level}`, () => {
            it(`Logs ${level} message`, () => {
                logger[level](`${level} message`);

                expect(console[level]).toBeCalledTimes(1);
                expect(console[level]).toBeCalledWith(
                    JSON.stringify(
                        <LogMessage>{
                            ID: 'id',
                            TimeStamp: 'now',
                            Environment: EnvironmentEnum.Local,
                            LogLevel: level,
                            Message: `${level} message`,
                            CommitSha: 'sha',
                            TraceID: 'trace-id',
                            Region: 'us-west-1',
                            UserIP: 'ip',
                            UserAgent: 'user-agent',
                            Context: {},
                        },
                        null,
                        2,
                    ),
                );
            });

            it(`Logs ${level} message with additional context`, () => {
                logger[level](`${level} message`, { foo: 'bar' });

                expect(console[level]).toBeCalledTimes(1);
                expect(console[level]).toBeCalledWith(
                    JSON.stringify(
                        <LogMessage>{
                            ID: 'id',
                            TimeStamp: 'now',
                            Environment: EnvironmentEnum.Local,
                            LogLevel: level,
                            Message: `${level} message`,
                            CommitSha: 'sha',
                            TraceID: 'trace-id',
                            Region: 'us-west-1',
                            UserIP: 'ip',
                            UserAgent: 'user-agent',
                            Context: {
                                foo: 'bar',
                            },
                        },
                        null,
                        2,
                    ),
                );
            });
        });
    });
});
