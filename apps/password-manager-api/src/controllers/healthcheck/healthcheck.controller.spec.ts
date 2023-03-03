import { HttpStatus } from '@nestjs/common/enums';
import { AppConfigService } from '@password-manager:api:services/config/app-config.service';
import { EnvironmentEnum } from '@password-manager:types';

import { HealthCheckController } from './healthcheck.controller';

describe('HealthCheckController Tests', () => {
    const mockAppConfigService = AppConfigService.prototype;
    let controller: HealthCheckController;

    beforeEach(() => {
        controller = new HealthCheckController(mockAppConfigService);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('Get Health Check', () => {
        beforeEach(() => {
            mockAppConfigService.getEnvironment = jest.fn().mockReturnValue(EnvironmentEnum.Local);
            mockAppConfigService.get = jest.fn().mockReturnValue('some-config');
        });

        it('Successful Results', () => {
            const actual = controller.getHealthCheck();

            expect(mockAppConfigService.getEnvironment).toBeCalledTimes(1);
            expect(mockAppConfigService.get).toBeCalledTimes(1);
            expect(mockAppConfigService.get).toBeCalledWith('commitSha');

            expect(actual.statusCode).toBe(HttpStatus.OK);
            expect(actual.environment).toBe(EnvironmentEnum.Local);
        });
    });
});
