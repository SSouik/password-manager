import { Controller, Inject, HttpCode, Get, HttpStatus } from '@nestjs/common';
import { DependencyInjectionTokenEnum, IHealthCheckService } from '@password-manager:api:types';
import { HealthCheckResponse } from '@password-manager:types';

@Controller('health')
export class HealthCheckController {
    constructor(
        @Inject(DependencyInjectionTokenEnum.HEALTH_CHECK_SERVICE)
        private readonly healthCheckService: IHealthCheckService,
    ) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    public getHealthCheck(): HealthCheckResponse {
        return this.healthCheckService.getHealth();
    }
}
