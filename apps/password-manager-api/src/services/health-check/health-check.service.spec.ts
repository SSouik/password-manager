import { ConfigService } from '@password-manager:api:services';
import { EnvironmentEnum } from '@password-manager:types';

import { HealthCheckService } from './health-check.service';

describe('HealthCheckService Tests', () => {
    const mockAppConfigService = ConfigService.prototype;
    let service: HealthCheckService;

    beforeEach(() => {
        service = new HealthCheckService(mockAppConfigService);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('Get Health', () => {
        beforeEach(() => {
            mockAppConfigService.getEnvironment = jest.fn().mockReturnValue(EnvironmentEnum.Local);
            mockAppConfigService.get = jest.fn().mockReturnValue('some-config');
        });

        it('Successful Results', () => {
            const actual = service.getHealth();

            expect(mockAppConfigService.getEnvironment).toBeCalledTimes(1);
            expect(mockAppConfigService.get).toBeCalledTimes(1);
            expect(mockAppConfigService.get).toBeCalledWith('commitSha');

            expect(actual.environment).toBe(EnvironmentEnum.Local);
            expect(actual.commitSha).toBe('some-config');
        });
    });
});
