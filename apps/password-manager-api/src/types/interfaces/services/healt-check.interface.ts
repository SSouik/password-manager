import { HealthCheckResponse } from '@password-manager:types';

export interface IHealthCheckService {
    getHealth(): HealthCheckResponse;
}
