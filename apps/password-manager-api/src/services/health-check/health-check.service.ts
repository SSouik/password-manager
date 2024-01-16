import { Injectable } from '@nestjs/common';
import { AppConfig } from '@password-manager:api:config';
import { IConfigService, IHealthCheckService } from '@password-manager:api:types';
import { HealthCheckResponse } from '@password-manager:types';

@Injectable()
export class HealthCheckService implements IHealthCheckService {
    constructor(private readonly configService: IConfigService<AppConfig>) {}
    public getHealth(): HealthCheckResponse {
        return {
            environment: this.configService.getEnvironment(),
            commitSha: this.configService.get('commitSha'),
        };
    }
}
