import { Controller, Inject, HttpCode, Get, HttpStatus, Headers } from '@nestjs/common';
import { AppConfig } from '@password-manager:api:config';
import { IAppConfigService } from '@password-manager:api:interfaces';
import { LOGGER } from '@password-manager:api:providers';
import { APP_CONFIG_SERVICE } from '@password-manager:api:services';
import { ILogger } from '@password-manager:logger';
import { HealthCheckResponse } from '@password-manager:types';

@Controller('healthcheck')
export class HealthCheckController {
    // Inject in the instance of Logger (found in providers/factories/logger/logger.provider.ts)
    constructor(
        @Inject(LOGGER)
        private readonly logger: ILogger,
        @Inject(APP_CONFIG_SERVICE)
        private readonly appConfigService: IAppConfigService<AppConfig>,
    ) {}

    // Add interceptor to add the trace id to each response
    @Get()
    @HttpCode(HttpStatus.OK)
    public handler(@Headers('x-request-trace-id') traceId: string): HealthCheckResponse {
        this.logger.info('In the health check controller');

        return {
            statusCode: HttpStatus.OK,
            environment: this.appConfigService.getEnvironment(),
            traceId: traceId,
            commitSha: this.appConfigService.get('commitSha'),
            version: '0.0.1',
        };
    }
}
