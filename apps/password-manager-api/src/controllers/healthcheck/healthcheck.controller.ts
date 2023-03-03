import { Controller, Inject, HttpCode, Get, HttpStatus } from '@nestjs/common';
import { AppConfig } from '@password-manager:api:config';
import { IAppConfigService } from '@password-manager:api:interfaces';
import { APP_CONFIG_SERVICE } from '@password-manager:api:services/config/app-config.service';
import { HealthCheckResponse } from '@password-manager:types';

@Controller('healthcheck')
export class HealthCheckController {
    constructor(
        @Inject(APP_CONFIG_SERVICE)
        private readonly appConfigService: IAppConfigService<AppConfig>,
    ) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    public getHealthCheck(): HealthCheckResponse {
        return {
            statusCode: HttpStatus.OK,
            message: 'Password Manager API is up and running',
            environment: this.appConfigService.getEnvironment(),
            commitSha: this.appConfigService.get('commitSha'),
        };
    }
}
