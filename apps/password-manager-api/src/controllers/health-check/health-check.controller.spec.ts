import { HealthCheckService } from '@password-manager:api:services';
import { EnvironmentEnum } from '@password-manager:types';

import { HealthCheckController } from './health-check.controller';

describe('HealthCheckController Tests', () => {
    const mockHealthCheckService = HealthCheckService.prototype;
    let controller: HealthCheckController;

    beforeEach(() => {
        controller = new HealthCheckController(mockHealthCheckService);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('Get Health Check', () => {
        beforeEach(() => {
            mockHealthCheckService.getHealth = jest
                .fn()
                .mockReturnValue({ environment: EnvironmentEnum.Local, commitSha: 'some-config' });
        });

        it('Successful Results', () => {
            const actual = controller.getHealthCheck();

            expect(actual.environment).toBe(EnvironmentEnum.Local);
            expect(actual.commitSha).toBe('some-config');
        });
    });
});
