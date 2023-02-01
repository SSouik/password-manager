import { EnvironmentEnum } from '@password-manager:types';

import { Logger } from './Logger';
import { LogMessageFactory } from './LogMessageFactory';
import { ILogger, LogLevelEnum, LogMessage } from './types';

describe('Logger Tests', () => {
    let logger: ILogger;

    beforeEach(() => {
        [LogLevelEnum.Info, LogLevelEnum.Debug, LogLevelEnum.Warn, LogLevelEnum.Error].forEach((level) => {
            console[level] = jest.fn();
        });

        logger = new Logger(new LogMessageFactory({ Environment: EnvironmentEnum.Local }));
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    [LogLevelEnum.Info, LogLevelEnum.Debug, LogLevelEnum.Warn, LogLevelEnum.Error].forEach((level) => {
        describe(`${level}`, () => {
            it(`Logs ${level} message`, () => {
                logger[level](`${level} message`);

                expect(console[level]).toBeCalledTimes(1);
                expect(console[level]).toBeCalledWith(<LogMessage>{
                    ID: expect.anything(),
                    LogLevel: level,
                    Environment: EnvironmentEnum.Local,
                    TimeStamp: expect.anything(),
                    CommitSha: expect.anything(),
                    TraceID: expect.anything(),
                    Region: expect.anything(),
                    UserIP: expect.anything(),
                    UserAgent: expect.anything(),
                    Message: `${level} message`,
                    Context: {},
                });
            });

            it(`Logs ${level} message with additional context`, () => {
                logger[level](`${level} message`, { foo: 'bar' });

                expect(console[level]).toBeCalledTimes(1);
                expect(console[level]).toBeCalledWith(<LogMessage>{
                    ID: expect.anything(),
                    LogLevel: level,
                    Environment: EnvironmentEnum.Local,
                    TimeStamp: expect.anything(),
                    CommitSha: expect.anything(),
                    TraceID: expect.anything(),
                    Region: expect.anything(),
                    UserIP: expect.anything(),
                    UserAgent: expect.anything(),
                    Message: `${level} message`,
                    Context: {
                        foo: 'bar',
                    },
                });
            });
        });
    });
});
