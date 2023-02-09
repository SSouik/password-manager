import { Controller, Inject, HttpCode, Get, HttpStatus } from '@nestjs/common';
import { AppConfig } from '@password-manager:api:config';
import { IAppConfigService } from '@password-manager:api:interfaces';
import { LOGGER } from '@password-manager:api:providers';
import { APP_CONFIG_SERVICE } from '@password-manager:api:services';
import { ILogger } from '@password-manager:logger';
import { APIUrlsEnum, HealthCheckResponse } from '@password-manager:types';

@Controller(APIUrlsEnum.HealthCheck)
export class HealthCheckController {
    // Inject in the instance of Logger (found in providers/factories/logger/logger.provider.ts)
    constructor(
        @Inject(LOGGER)
        private readonly logger: ILogger,
        @Inject(APP_CONFIG_SERVICE)
        private readonly appConfigService: IAppConfigService<AppConfig>,
    ) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    public handler(): HealthCheckResponse {
        this.logger.info('In the health check controller');

        return {
            statusCode: HttpStatus.OK,
            message: 'Password Manager API is up and running',
            environment: this.appConfigService.getEnvironment(),
            commitSha: this.appConfigService.get('commitSha'),
        };
    }
}
