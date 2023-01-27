import { Controller, Inject, HttpCode, Get, HttpStatus } from '@nestjs/common';
import { LOGGER } from '@password-manager:api:providers/factories/logger/logger.provider';
import { ILogger } from '@password-manager:logger';
import { HealthCheckResponse } from '@password-manager:types';

// Make abstract controller with base functionality of getting the trace id
@Controller('healthcheck')
export class HealthCheckController {
    // Inject in the instance of Logger (found in providers/factories/logger/logger.provider.ts)
    constructor(@Inject(LOGGER) private readonly logger: ILogger) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    public handler(): HealthCheckResponse {
        this.logger.info('In the health check controller');

        return {
            statusCode: HttpStatus.OK,
            traceId: 'trace id',
            commitSha: 'commitSha',
            version: '0.0.1',
        };
    }
}
