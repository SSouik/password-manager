import { ILogger, ILogMessageFactory, LogLevelEnum } from './types';

export class Logger implements ILogger {
    constructor(private readonly logMessageFactory: ILogMessageFactory) {}

    public info(message: string, context = {}): void {
        this.log(LogLevelEnum.Info, message, context);
    }

    public debug(message: string, context = {}): void {
        this.log(LogLevelEnum.Debug, message, context);
    }

    public warn(message: string, context = {}): void {
        this.log(LogLevelEnum.Warn, message, context);
    }

    public error(message: string, context = {}): void {
        this.log(LogLevelEnum.Error, message, context);
    }

    private log(level: LogLevelEnum, message: string, context: any): void {
        const logMessage = this.logMessageFactory.create(level, message, context);
        console[level](JSON.parse(JSON.stringify(logMessage)));
    }
}
