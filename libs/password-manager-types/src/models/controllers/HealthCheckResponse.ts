import { EnvironmentEnum } from '../../common';

export type HealthCheckResponse = {
    environment: EnvironmentEnum;
    commitSha: string;
};
