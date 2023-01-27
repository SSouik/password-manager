import { LogMessageFactory } from './LogMessageFactory';
import { LogLevelEnum, LogPropertyEnum } from './types';

describe('Log Message Factory Tests', () => {
    let factory: LogMessageFactory;

    beforeEach(() => {
        [LogLevelEnum.Info, LogLevelEnum.Debug, LogLevelEnum.Warn, LogLevelEnum.Error].forEach((level) => {
            console[level] = jest.fn();
        });
    });

    describe('Default Properties', () => {
        beforeEach(() => {
            factory = new LogMessageFactory({
                CommitSha: '123',
                Region: 'us-west-1',
                UserIP: 'IP',
                UserAgent: 'Agent',
            });
        });

        describe('Set Property', () => {
            it('Sets TraceID property', () => {
                factory.setProperty(LogPropertyEnum.TraceID, 'trace-id');

                const message = factory.create(LogLevelEnum.Info, 'message', {});

                expect(message.CommitSha).toBe('123');
                expect(message.Region).toBe('us-west-1');
                expect(message.UserIP).toBe('IP');
                expect(message.UserAgent).toBe('Agent');
                expect(message.TraceID).toBe('trace-id');
            });

            it('Overrides default property', () => {
                factory.setProperty(LogPropertyEnum.Region, 'us-west-2');

                const message = factory.create(LogLevelEnum.Info, 'message', {});

                expect(message.CommitSha).toBe('123');
                expect(message.Region).toBe('us-west-2');
                expect(message.UserIP).toBe('IP');
                expect(message.UserAgent).toBe('Agent');
            });
        });

        describe('Set Context', () => {
            it('Sets a key within the log context', () => {
                factory.setContext('foo', 'bar');

                const message = factory.create(LogLevelEnum.Info, 'message', {});

                expect(message.CommitSha).toBe('123');
                expect(message.Region).toBe('us-west-1');
                expect(message.UserIP).toBe('IP');
                expect(message.UserAgent).toBe('Agent');
                expect(message.Context).toStrictEqual({
                    foo: 'bar',
                });
            });

            it('Appends additional context when creating the log message', () => {
                factory.setContext('foo', 'bar');

                const message = factory.create(LogLevelEnum.Info, 'message', { key: 'value' });

                expect(message.CommitSha).toBe('123');
                expect(message.Region).toBe('us-west-1');
                expect(message.UserIP).toBe('IP');
                expect(message.UserAgent).toBe('Agent');
                expect(message.Context).toStrictEqual({
                    foo: 'bar',
                    key: 'value',
                });
            });
        });
    });
});
