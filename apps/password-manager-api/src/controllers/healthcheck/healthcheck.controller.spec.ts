import { HttpStatus } from '@nestjs/common/enums';
import { AppConfigService } from '@password-manager:api:services';
import { Logger } from '@password-manager:logger';
import { EnvironmentEnum } from '@password-manager:types';

import { HealthCheckController } from './healthcheck.controller';

describe('HealthCheckController Tests', () => {
    const mockLogger = Logger.prototype;
    const mockAppConfigService = AppConfigService.prototype;
    let controller: HealthCheckController;

    beforeEach(() => {
        ['info', 'debug', 'warn', 'error'].forEach((level) => {
            mockLogger[level] = jest.fn();
        });

        mockAppConfigService.getEnvironment = jest.fn().mockReturnValue(EnvironmentEnum.Local);
        mockAppConfigService.get = jest.fn().mockReturnValue('some-config');

        controller = new HealthCheckController(mockLogger, mockAppConfigService);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('Retruns a 200', () => {
        const actual = controller.handler();

        expect(mockLogger.info).toBeCalledTimes(1);
        expect(mockLogger.info).toBeCalledWith('In the health check controller');

        expect(mockAppConfigService.getEnvironment).toBeCalledTimes(1);
        expect(mockAppConfigService.get).toBeCalledTimes(1);
        expect(mockAppConfigService.get).toBeCalledWith('commitSha');

        expect(actual.statusCode).toBe(HttpStatus.OK);
        expect(actual.environment).toBe(EnvironmentEnum.Local);
    });
});
