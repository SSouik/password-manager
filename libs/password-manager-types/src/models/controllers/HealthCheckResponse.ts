import { ResponseBase } from './ResponseBase';

export type HealthCheckResponse = ResponseBase & {
    commitSha: string;
    version: string;
};
