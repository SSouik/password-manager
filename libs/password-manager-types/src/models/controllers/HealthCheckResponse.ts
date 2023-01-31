import { ResponseBase } from './ResponseBase';

import { EnvironmentEnum } from '../../common';

export type HealthCheckResponse = ResponseBase & {
    environment: EnvironmentEnum;
    commitSha: string;
    version: string;
};
